import { API, InlineTool } from '@editorjs/editorjs';

class SelectAndLinkTool implements InlineTool {
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
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '🔗'; // Icon for linking
    this.button.classList.add('ce-inline-tool');
    this.button.addEventListener('click', this.handleClick.bind(this));

    return this.button;
  }

  private async handleClick() {
    const selection = window.getSelection();

    if (selection && selection.toString()) {
      this.selectedText = selection.toString();

      // Confirm if the user wants to select all instances of the selected text
      const shouldSelectAll = confirm(`Do you want to select all instances of "${this.selectedText}"?`);

      if (shouldSelectAll) {
        try {
          await this.selectAllInstances(this.selectedText);
        } catch (error) {
          console.error('Error selecting all instances:', error);
        }
      }

      const link = prompt('Enter the link URL:');
      if (link) {
        try {
          await this.applyLinkToAllSelected(link);
          this.api.saver.save(); // Save content after making changes
        } catch (error) {
          console.error('Error applying link to all selected:', error);
        }
      }
    } else {
      alert('Please select some text first.');
    }
  }
  private async selectAllInstances(searchWord: string) {
    const totalBlocks = this.api.blocks.getBlocksCount();
  
    for (let i = 0; i < totalBlocks; i++) {
      try {
        const block = this.api.blocks.getBlockByIndex(i);
  
        if (block && block.holder) {  // Check if the block and holder are not undefined
          const blockContent = (block.holder as HTMLElement).innerHTML;  // Get the current block content as HTML
  
          const regex = new RegExp(`\\b${searchWord}\\b`, 'gi');
          // const regex = new RegExp(`\\b${searchWord}\\b`, 'gi');
          const updatedContent = blockContent.replace(
            regex,
            (match) => `<span class="selected">${match}</span>`
          );
  
          // Update the block content using the block ID
          await this.api.blocks.update(block.id, {
            text: updatedContent
          });
        }
      } catch (error) {
        console.error('Error updating block:', error);
      }
    }
  }
  
  private async applyLinkToAllSelected(link: string) {
    const totalBlocks = this.api.blocks.getBlocksCount();
  
    for (let i = 0; i < totalBlocks; i++) {
      try {
        const block = this.api.blocks.getBlockByIndex(i);
  
        if (block && block.holder) {  // Check if the block and holder are not undefined
          const blockContent = (block.holder as HTMLElement).innerHTML;  // Get the current block content as HTML
  
          const regex = /<span class="selected">([^<]*)<\/span>/gi;
  
          // Update content by wrapping selected text with anchor tags
          const updatedContent = blockContent.replace(regex, (_, match) => {
            return `<a href="${link}">${match}</a>`;
          });
  
          // Update the block content using the block ID
          await this.api.blocks.update(block.id, {
            text: updatedContent
          });
        }
      } catch (error) {
        console.error('Error updating block:', error);
      }
    }
  }
  

  surround(range: Range) {
    this.selectedText = range.toString();
  }

  checkState(selection: Selection): boolean {
    const anchorTag = selection.anchorNode?.parentElement;
    return !!anchorTag && anchorTag.tagName === 'A';
  }

  clear() {
    // This can be used to clear any existing highlights if needed
  }
}

export default SelectAndLinkTool;
