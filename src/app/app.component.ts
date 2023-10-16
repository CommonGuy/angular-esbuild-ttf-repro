import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'repro-app';

  @ViewChild("container")
  public editorContainer?: ElementRef;

  constructor() {

    self.MonacoEnvironment = {
      getWorker: function (workerId, label) {
        // Note: This doesn't work yet, but monaco falls back to loading the worker in the main thread
        return new Worker('monaco-editor/esm/vs/editor/editor.worker.js', {
          type: 'module',
        });
      },
    };

  }

  public async ngAfterViewInit(): Promise<void> {
    const monaco = await import('monaco-editor');
    monaco.editor.create(this.editorContainer?.nativeElement);
  }
}
