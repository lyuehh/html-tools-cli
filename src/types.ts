export interface Field {
  name: string;
  selector: string;
  label: string;
  type: string;
  default: string | boolean;
  choices?: { value: string; label: string }[];
  min?: string;
  max?: string;
  accept?: string;
  multiple?: boolean;
}
export interface Action { name: string; label: string; expression: string; sample?: Record<string, string | boolean>; outputs?: string[] }
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  source: string;
  sha256: string;
  status: 'ready' | 'skipped';
  reason?: string;
  fields: Field[];
  actions: Action[];
  sample: Record<string, string | boolean>;
  outputs?: string[];
  adaptations?: string[];
  network?: boolean;
}
export interface Payload { html: string; script: string; libraries?: string[]; network?: boolean }
export interface ExecutionOptions { fetch?: typeof globalThis.fetch }
export interface Result { tool: string; action: string; results: Record<string, string> }
