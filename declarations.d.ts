
declare module "*.svg" {
    import React from "react";
    import { SVGProps } from "react";
    const content: React.FC<SVGProps<SVGSVGElement>>;
    export default content;
}


declare module '@env' {
    export const apiKey: string;
    export const authDomain: string;
    export const projectId: string;
    export const storageBucket: string;
    export const appId: string;
  }