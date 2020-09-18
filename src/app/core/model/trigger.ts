export class Trigger {  
    data: {
        firstName: string,
        lastName: string,
        type: number,
    };
    isApproaching: boolean;
    applicationId: number;
    mainObjectId: number;
    objectId: number;
    severity: number;
    triggerCategory: number;
    triggerType: number;
    value: number;

}

// export class TriggerOptions {

//    getTriggerType(typeId: number): object {
//        return this.types.find(x => x.id === typeId).title;
//    }

//    getDays(days: number): string {
//        if (days < 0) {
//            return `for ${+days * -1} days`;
//        }
//        return `for ${days} days`;
//    }

//    categories: any[] = [
//        { id: 0, title: 'All category', url: '' },
//        { id: 1, title: 'Profile', url: 'profile' },
//        { id: 2, title: 'Tools', url: 'tools' },
//        { id: 3, title: 'Classes', url: 'classes' },
//        { id: 4, title: 'Ride Along', url: 'ride-along' },
//    ];

//    types: any[] = [
//        { id: 0, title: 'Application registration not completed' },
//        { id: 1, title: 'Tools invoice not sent' },
//        { id: 2, title: 'Tools not ordered' },
//        { id: 3, title: 'Tools check not received' },
//        { id: 4, title: 'Tools check not sent' },
//        { id: 5, title: 'Tools already needed, but not received yet' },
//        { id: 6, title: 'Class invitation not sent' },
//        { id: 7, title: 'Class starts, but application is not completed' },
//        { id: 8, title: 'Class has ended, but feedback not provided' },
//        { id: 9, title: 'Ride Along feedback not provided' },
//    ];
// }
