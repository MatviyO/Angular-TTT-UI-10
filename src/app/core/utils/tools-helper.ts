import { Injectable } from '@angular/core';
import { ToolsService } from '../data';
import { Tools } from '../model';

@Injectable()
export class ToolsHelper {
    constructor(private dataSvc: ToolsService) {
    }

    async updateNeedByDate(appId: number, neededBy: Date): Promise<Tools> {
        let tools: Tools;
        try {
            tools = await this.dataSvc.select(appId, 'appl');
        } catch (e) {
            return Promise.resolve(null);
        }

        if (tools && tools.id > 0) {
            tools.toolsNeededBy = neededBy;
            return this.dataSvc.update(tools);
        } else {
            return Promise.resolve(new Tools());
        }
    }
}
