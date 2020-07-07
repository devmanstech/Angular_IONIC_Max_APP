import { NgModule } from '@angular/core';
import { DateConvertorPipe } from './date-convertor/date-convertor';
import {CalanderConvertorPipe} from "./date-convertor/calander";
import { KeysPipe } from "./keys";

@NgModule({
	declarations: [DateConvertorPipe,CalanderConvertorPipe, KeysPipe],
	imports: [],
	exports: [DateConvertorPipe,CalanderConvertorPipe, KeysPipe]
})
export class PipesModule {}
