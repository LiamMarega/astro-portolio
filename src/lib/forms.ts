/**
 * Types for the multi-step lead forms (/contact and /ecommerce).
 * The copy of each form lives next to the rest of its page content:
 * `site.contact.form` (src/content/site.ts) and `ecommerce.form` (src/content/ecommerce.ts).
 */

export interface ChoiceOption {
  /** what gets sent (defaults to the label) */
  value?: string;
  label: string;
  /** Lucide icon name, e.g. 'Store' (https://lucide.dev/icons) */
  icon?: string;
}

interface FieldBase {
  /** key of the answer in the payload */
  name: string;
  /** visible label (for a lone choice field the step title is used when omitted) */
  label?: string;
  required?: boolean;
}

export type FormField =
  | (FieldBase & {
      kind: 'choice';
      options: ChoiceOption[];
      /** checkboxes instead of radios */
      multiple?: boolean;
      /** 'cards' = big tappable rows with icon, 'chips' = compact pills */
      look?: 'cards' | 'chips';
    })
  | (FieldBase & {
      kind: 'text' | 'email' | 'tel' | 'url';
      placeholder?: string;
      autocomplete?: string;
      /** takes half the row on wide screens */
      half?: boolean;
      maxlength?: number;
    })
  | (FieldBase & {
      kind: 'textarea';
      placeholder?: string;
      rows?: number;
      maxlength?: number;
    });

export interface FormStep {
  title: string;
  hint?: string;
  fields: FormField[];
}

export interface HiddenField {
  name: string;
  /** label used in the email you receive */
  label: string;
  /** show the value as a removable chip above the form (e.g. the plan picked in pricing) */
  chip?: boolean;
}

export interface LeadFormText {
  /** progress label, {n} and {total} are replaced */
  step: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
  optional: string;
  errors: { required: string; choose: string; email: string; url: string };
  privacy: string;
  /** chip shown for hidden fields with `chip: true` */
  chosen?: string;
  clear?: string;
  /** {name} and {email} are replaced with what the person typed */
  success: { title: string; body: string; steps?: string[] };
  error: { title: string; body: string; mail: string; retry: string; subject: string; intro: string };
}

export interface LeadFormConfig {
  /** sent as `source`, so every email says which form the lead came from */
  source: string;
  lang: string;
  steps: FormStep[];
  hidden?: HiddenField[];
  text: LeadFormText;
}
