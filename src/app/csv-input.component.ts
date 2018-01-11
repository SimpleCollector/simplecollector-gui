import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'csv-input',
  template: `
    <input type="text" #csvInput
      [attr.id]="id ? id : null"
      [attr.name]="name ? name : null"
      [attr.placeholder]="placeholder ? placeholder : null"
      [value]="csvString" 
      (change)="_onChange($event)" 
      (keyup)="_onChange($event)"
      (blur)="_onTouched()">
  `,
  providers: [
               {
                   provide: NG_VALUE_ACCESSOR,
                   useExisting: forwardRef(() => CsvInputComponent),
                   multi: true,
                }
              ]
})
export class CsvInputComponent implements OnInit, ControlValueAccessor  {

  @Input() id: string;
  @Input() name: string;
  @Input() placeholder: string;
  @ViewChild('csvInput') _elementRef:ElementRef;
  csvString: string = '';
  private data: string[];

  // The method set in registerOnChange, it is just a placeholder for a method that takes one parameter. 
  // Used to emit changes back to the form.
  private propagateChange = (_: any) => { };
  _onTouched: () => {};
    
  constructor(private _renderer: Renderer2) { }

  ngOnInit() {
  }
  
  writeValue(obj: any): void {
      if (obj) {
          this.data = obj;
          this.csvString = this.data.join(',');
      }
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
      this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  _onChange(event) {
      let newValue: string = event.target.value;
      this.data = newValue.split(',');
      // update the form
      this.propagateChange(this.data);
  }

}
