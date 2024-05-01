export type CustomText = { text: string };

export type CustomElement = {
  type: "paragraph" | "h1" | "h2" | "h3";
  children: CustomText[];
};

export declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type H1Element = {
  type: "h1";
  character: string;
  children: CustomText[];
};

export type H2Element = {
  type: "h2";
  character: string;
  children: CustomText[];
};

export type H3Element = {
  type: "h3";
  character: string;
  children: CustomText[];
};

export type Paragraph = {
  type: "paragraph";
  character: string;
  children: CustomText[];
};
