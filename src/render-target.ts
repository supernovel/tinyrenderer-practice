import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("render-target")
export class RenderTarget extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
    }
  `;

  @property({ type: Function })
  buildImage?: () => Blob;

  private _buildImageTask = new Task(this, {
    task: async () => {
      if (this.buildImage == null) {
        throw Error("이미지 생성 함수가 없습니다.");
      }

      return {
        image: URL.createObjectURL(this.buildImage()),
        name: "test",
      };
    },
    args: () => [],
    autoRun: true,
  });

  // Render the UI as a function of component state
  render() {
    return this._buildImageTask.render({
      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => html`<p>Loading image...</p>`,
      complete: (data) => {
        return html` <img src="${data.image}" alt="${data.name}" /> `;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "render-target": RenderTarget;
  }
}
