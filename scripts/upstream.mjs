import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const checkout = resolve(root, 'html-tools');
const lockPath = resolve(root, 'upstream.lock.json');
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
const args = process.argv.slice(2);
if (args.some(arg => !['--update', '--check', '--help'].includes(arg)) || (args.includes('--check') && args.includes('--update'))) {
  console.error('用法: npm run upstream -- [--check | --update]'); process.exit(1);
}
if (args.includes('--help')) {
  console.log('npm run upstream -- [--check | --update]\n默认恢复锁定版本并重新生成、验证；--check 只检查；--update 获取上游默认分支最新提交并重新生成、验证。'); process.exit(0);
}
function command(program, argv, cwd = root, capture = false) {
  const result = spawnSync(program, argv, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${program} ${argv.join(' ')} 失败，退出码 ${result.status}${capture ? `: ${result.stderr.trim()}` : ''}`);
  return capture ? result.stdout.trim() : '';
}
function git(...argv) { return command('git', argv, checkout, true); }
try {
  if (!/^https:\/\/github\.com\/chicogong\/html-tools(?:\.git)?$/.test(lock.url) || !/^[0-9a-f]{40}$/.test(lock.revision)) throw new Error('upstream.lock.json 中的 URL 或 revision 无效');
  if (!existsSync(checkout)) {
    if (args.includes('--check')) throw new Error('html-tools 尚未检出；运行 npm run upstream 恢复锁定版本');
    command('git', ['clone', lock.url, checkout]);
  }
  git('rev-parse', '--git-dir');
  const dirty = git('status', '--porcelain', '--untracked-files=all');
  if (dirty) throw new Error(`html-tools 存在未提交或未跟踪的文件，请先自行保存或清理：\n${dirty}`);
  const current = git('rev-parse', 'HEAD');
  if (args.includes('--check')) {
    if (current !== lock.revision) throw new Error(`上游版本不匹配：当前 ${current}，锁定 ${lock.revision}`);
    const markerPath = resolve(root, 'generated/upstream-revision.json');
    if (!existsSync(markerPath) || JSON.parse(readFileSync(markerPath, 'utf8')).revision !== current) throw new Error('生成结果未标记为当前上游版本；运行 npm run upstream 重新生成并验证');
    console.log(`上游版本和已验证的生成结果一致：${current}`); process.exit(0);
  }
  let target = lock.revision;
  if (args.includes('--update')) {
    command('git', ['fetch', 'origin', 'HEAD'], checkout);
    target = git('rev-parse', 'FETCH_HEAD^{commit}');
  } else if (current !== target) {
    const available = spawnSync('git', ['cat-file', '-e', `${target}^{commit}`], {cwd:checkout});
    if (available.status !== 0) command('git', ['fetch', 'origin', target], checkout);
  }
  if (current !== target) command('git', ['checkout', '--detach', target], checkout);
  if (args.includes('--update')) {
    lock.revision = target;
    writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
  }
  const catalogPath = resolve(root, 'generated/catalog.json');
  const before = existsSync(catalogPath) ? JSON.parse(readFileSync(catalogPath, 'utf8')) : [];
  console.log(`上游版本：${target}。开始重新生成并验证；失败时请修复问题并重新运行 npm run upstream。`);
  command('npm', ['run', 'generate']);
  const after = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const previous = new Map(before.map(tool => [tool.id, tool]));
  const added = after.filter(tool => !previous.has(tool.id));
  const changed = after.filter(tool => previous.has(tool.id) && previous.get(tool.id).sha256 !== tool.sha256);
  const removed = before.filter(tool => !after.some(item => item.id === tool.id));
  console.log(`上游工具变化：新增 ${added.length}，源码变更 ${changed.length}，移除 ${removed.length}。`);
  command('npm', ['run', 'docs']);
  command('npm', ['test']);
  writeFileSync(resolve(root, 'generated/upstream-revision.json'), JSON.stringify({url: lock.url, revision: target}, null, 2) + '\n');
  console.log('更新完成。请检查 upstream.lock.json、generated/ 和 docs/ 的变更后一起提交。');
} catch (error) {
  console.error(`上游同步失败：${error instanceof Error ? error.message : error}`); process.exitCode = 1;
}
