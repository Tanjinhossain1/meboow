import { API, InlineTool } from "@editorjs/editorjs";

class SearchAndReplaceText implements InlineTool {
  private api: API;
  private button: HTMLButtonElement | null = null;
  private selectedText: string | null = null;

  constructor({ api }: { api: API }) {
    this.api = api;
  }

  static get isInline(): boolean {
    return true;
  }

  render(): HTMLButtonElement {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML = "🔍"; // Search & Replace Icon
    this.button.classList.add("ce-inline-tool");
    this.button.addEventListener("click", this.handleClick.bind(this));

    return this.button;
  }

  private async handleClick() {
    const selection = window.getSelection();

    if (selection && selection.toString()) {
      this.selectedText = selection.toString().trim();

      // Ask user for the replacement text
      const replacementText = prompt(`Replace all instances of "${this.selectedText}" with:`);
      
      if (replacementText !== null) {
        try {
          await this.replaceAllInstances(this.selectedText, replacementText);
          this.api.saver.save(); // Save content after replacing
        } catch (error) {
          console.error("Error replacing text:", error);
        }
      }
    } else {
      alert("Please select some text first.");
    }
  }

  private async replaceAllInstances(searchWord: string, replacement: string) {
    const totalBlocks = this.api.blocks.getBlocksCount();

    for (let i = 0; i < totalBlocks; i++) {
      try {
        const block = this.api.blocks.getBlockByIndex(i);

        if (block && block.holder) {
          const blockContent = (block.holder as HTMLElement).innerHTML;

          // Regular expression to match the word while avoiding HTML tags
          const regex = new RegExp(`\\b${searchWord}\\b(?![^<]*>)`, "gi");

          // Replace all instances of the selected word
          const updatedContent = blockContent.replace(regex, replacement);

          await this.api.blocks.update(block.id, { text: updatedContent });
        }
      } catch (error) {
        console.error("Error updating block:", error);
      }
    }
  }

  surround(range: Range) {
    this.selectedText = range.toString();
  }

  checkState(selection: Selection): boolean {
    return false;
  }

  clear() {}
}

export default SearchAndReplaceText;
