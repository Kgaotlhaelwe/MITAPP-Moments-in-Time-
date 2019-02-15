import { NgModule } from '@angular/core';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';
import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [CanvasDrawComponent,
    ExpandableHeaderComponent],
	imports: [],
	exports: [CanvasDrawComponent,
    ExpandableHeaderComponent]
})
export class ComponentsModule {}
