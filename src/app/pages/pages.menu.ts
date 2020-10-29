export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'todo-dashboard',                    // path for our page
        data: {                               // custom menu declaration
          menu: {
            title: 'ToDo',           // menu title
            icon: 'fa fa-check-square-o',     // menu icon
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'fa fa-home',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'application-process',
            data: {
              menu: {
                title: 'Application process',
                icon: 'fa fa-calendar-check-o stats',
              },
            },
          },
          {
            path: 'program-stats',
            data: {
              menu: {
                title: 'Program stats',
                icon: 'fa fa-bar-chart stats',
              },
            },
          },
          {
            path: 'class-activity',
            data: {
              menu: {
                title: 'Class activity',
                icon: 'fa fa-line-chart stats',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'tools-stats',
            data: {
              menu: {
                title: 'Tools stats',
                icon: 'fa fa-briefcase stats',
              },
            },
          },
          {
            path: 'ride-along-stats',
            data: {
              menu: {
                title: 'Ride Along stats',
                icon: 'fa fa-car stats',
              },
            },
          },
          {
            path: 'mentorship-stats',
            data: {
              menu: {
                title: 'Mentorship stats',
                icon: 'fa fa-male stats',
              },
            },
          },
          {
            path: 'schedule-interviews-stats',
            data: {
              menu: {
                title: 'Schedule Interviews',
                icon: 'fa fa-calendar-check-o stats',
              },
            },
          },
          {
            path: 'interview-feedback-stats',
            data: {
              menu: {
                title: 'Interview Feedback',
                icon: 'ion-person-stalker stats',
              },
            },
          },
          {
            path: 'housing-allowance-stats',
            data: {
              menu: {
                title: 'Housing Allowance',
                icon: 'fa fa-umbrella stats',
              },
            },
          },
          {
            path: 'hiller-workforce-stats',
            data: {
              menu: {
                title: 'Hiller Workforce',
                icon: 'fa fa-rocket stats',
              },
            },
          },
          {
            path: 'sign-on-bonus-stats',
            data: {
              menu: {
                title: 'Sign on bonus',
                icon: 'fa fa-usd stats',
              },
            },
          },

        ],
      },

      {
        path: '',
        data: {
          menu: {
            title: 'Program',
            icon: 'fa fa-file-text-o',
            selected: false,
            expanded: true,
            order: 400,
          },
        },
        children: [
          {
            path: 'profile',
            data: {
              menu: {
                title: 'Profiles',
                icon: 'fa fa-user',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 909,
              },
            },
          },
          {
            path: 'tools',
            data: {
              menu: {
                title: 'Tools',
                icon: 'fa fa-briefcase',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 910,
              },
            },
          },
          {
            path: 'classes',
            data: {
              menu: {
                title: 'Graduations',
                icon: 'fa fa-graduation-cap',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'ride-along',
            data: {
              menu: {
                title: 'Ride Along',
                icon: 'fa fa-car',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'mentorship',
            data: {
              menu: {
                title: 'Mentorship',
                icon: 'fa fa-male',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'interviews',
            data: {
              menu: {
                title: 'Interviews',
                icon: 'ion-person-stalker',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'job-tracking',
            data: {
              menu: {
                title: 'Employments',
                icon: 'fa fa-history',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'housing-allowance',
            data: {
              menu: {
                title: 'Housing Allowance',
                icon: 'ion-umbrella',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: 'housing-transportation',
            data: {
              menu: {
                title: 'Housing & Transportation',
                icon: 'fa fa-building-o',
                pathMatch: 'prefix',
                selected: false,
                expanded: false,
                order: 911,
              },
            },
          },
          {
            path: '',
            data: {
              menu: {
                title: 'WF Training',
                icon: 'fa fa-line-chart',
                selected: false,
                expanded: false,
                order: 400,
              },
            },
            children: [
              {
                path: 'workforce-personal',
                data: {
                  menu: {
                    title: 'WF Personal',
                    icon: 'fa fa-id-badge',
                    pathMatch: 'prefix',
                  },
                },
              },
              {
                path: 'workforce-company',
                data: {
                  menu: {
                    title: 'WF Company',
                    icon: 'fa fa-building-o',
                    pathMatch: 'prefix',
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: 'events',
        data: {
          menu: {
            title: 'Events',
            icon: 'fa fa-calendar',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'registration-event',
            data: {
              menu: {
                title: 'Registration Event',
                icon: 'fa fa-calendar-plus-o event',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'orientation-event',
            data: {
              menu: {
                title: 'Orientation Event',
                icon: 'fa fa-calendar-check-o event',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'graduations',
            data: {
              menu: {
                title: 'Graduation Event',
                icon: 'ion-university event',
                pathMatch: 'prefix',
              },
            },
          },
        ],
      },
      {
        path: 'reports',
        data: {
          menu: {
            title: 'Reports',
            icon: 'fa fa-files-o',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'employment-report',
            data: {
              menu: {
                title: 'Employment report',
                icon: 'fa fa-file report',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'interview-report',
            data: {
              menu: {
                title: 'Interview report',
                icon: 'fa fa-file report',
                pathMatch: 'prefix',
              },
            },
          },
        ],
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'Auxiliary data',
            icon: 'fa fa-database',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'classes-schedule',
            data: {
              menu: {
                title: 'Classes',
                icon: 'ion-ios-calendar-outline data',
                pathMatch: 'prefix',
              },
            },
          },

          {
            path: 'non-placement-reasons',
            data: {
              menu: {
                title: 'Non-placement reasons',
                icon: 'fa fa-expand data',
                pathMatch: 'prefix',
              },
            },
          },

          {
            path: 'graduation-locations',
            data: {
              menu: {
                title: 'Grad. Locations',
                icon: 'ion-ios-location data',
              },
            },
          },
          {
            path: 'company',
            data: {
              menu: {
                title: 'Companies',
                icon: 'ion-calculator data',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'company-affiliates',
            data: {
              menu: {
                title: 'Company Source',
                icon: 'ion-pricetags data',
              },
            },
          },
          {
            path: 'campuses',
            data: {
              menu: {
                title: 'Campuses',
                icon: 'ion-podium data',
              },
            },
          },
          {
            path: 'office-locations',
            data: {
              menu: {
                title: 'Office Locations',
                icon: 'ion-ios-navigate data',
              },
            },
          },
          {
            path: 'base-name',
            data: {
              menu: {
                title: 'Military Bases',
                icon: 'ion-ios-pricetags data',
              },
            },
          },
          {
            path: 'military',
            data: {
              menu: {
                title: 'Military Branch',
                icon: 'fa fa-list-alt data',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'rank',
            data: {
              menu: {
                title: 'Rank',
                icon: 'fa fa-shield data',
                pathMatch: 'prefix',
              },
            },
          },
          {
            path: 'references',
            data: {
              menu: {
                title: 'References',
                icon: 'ion-ios-browsers data',
              },
            },
          },
          {
            path: 'exits',
            data: {
              menu: {
                title: 'Exit Reasons',
                icon: 'ion-android-exit data',
              },
            },
          },
          {
            path: 'call-reasons',
            data: {
              menu: {
                title: 'Call Reasons',
                icon: 'ion-ios-telephone-outline data',
              },
            },
          },
          // {
          //     path: 'levels',
          //     data: {
          //         menu: {
          //             title: 'Levels',
          //             icon: 'ion-arrow-graph-up-right data',
          //         },
          //     },
          // },
          {
            path: 'feedbacks',
            data: {
              menu: {
                title: 'Feedbacks',
                icon: 'ion-arrow-return-left data',
              },
            },
          },
          {
            path: 'interview-type',
            data: {
              menu: {
                title: 'Interview Type',
                icon: 'ion-ios-paper-outline data',
              },
            },
          },
          // {
          //     path: 'interview-status',
          //     data: {
          //         menu: {
          //             title: 'Interview Status',
          //             icon: 'ion-document-text data',
          //         },
          //     },
          // },
          {
            path: 'interview-outcome',
            data: {
              menu: {
                title: 'Interview Outcome',
                icon: 'ion-log-out data',
              },
            },
          },
          {
            path: 'employment-status',
            data: {
              menu: {
                title: 'Employment Status',
                icon: 'ion-ios-paper data',
              },
            },
          },

        ],
      },

    ],
  },
];
