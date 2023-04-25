import { Directive, ElementRef, HostListener , Input} from '@angular/core';
  
@Directive({
  selector: '[songBorderCard]'
})
export class BorderCardDirective {

    private initialColor :string = '#f5f5f5';
    private defaultColor :string = '#009688';

    constructor(private el: ElementRef) {
        this.setBorder('#f5f5f5');
        this.el.nativeElement.margin= '100px'
        this.borderColor="";
    }

    @Input('songBorderCard') borderColor: string;

    @HostListener('mouseenter') onMouseEnter(){
        this.setBorder(this.borderColor || this.defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.setBorder(this.initialColor);
    }
  
    private setBorder(color: string) {
        let border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }
  
    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }
}