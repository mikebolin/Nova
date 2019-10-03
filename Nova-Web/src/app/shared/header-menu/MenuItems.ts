export enum MenuTypes {
  Link,
  Category
}

export class MenuItem {
  Label: String;
  URL: String;
  routerLink: Array<string>;
  operation: String;
  operation2: String;
  type: MenuTypes;
  Children: Array<MenuItem>;
}

export let InitialData = new Array<MenuItem>();

const Track: MenuItem[] = [
  {
    Label: 'Logs',
    URL: '',
    operation: 'InvoiceAudit',
    operation2: 'InvoiceAudit',
    routerLink: null,
    type: MenuTypes.Category,
    Children: [
      {
        Label: 'Activity',
        URL: '#',
        routerLink: ['audit-queue'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Error',
        URL: '#',
        routerLink: ['audit-queue/carrier'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Service',
        URL: '#',
        routerLink: ['audit-queue/return'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Azure',
        URL: '#',
        routerLink: ['audit-queue/secondary'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      }
    ]
  },

  {
    Label: 'Application',
    URL: '',
    operation: 'InvoiceAudit',
    operation2: 'InvoiceAudit',
    routerLink: null,
    type: MenuTypes.Category,
    Children: [
      {
        Label: 'Shipment Detail',
        URL: '#',
        routerLink: ['audit-queue'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Integration',
        URL: '#',
        routerLink: ['audit-queue/document'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Create Integration',
        URL: '#',
        routerLink: ['audit-queue/carrier'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Importers',
        URL: '#',
        routerLink: ['audit-queue/carrier'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Status',
        URL: '#',
        routerLink: ['audit-queue/carrier'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      }
    ]
  },
  {
    Label: 'Shipment',
    URL: '',
    operation: 'InvoiceAudit',
    operation2: 'InvoiceAudit',
    routerLink: null,
    type: MenuTypes.Category,
    Children: [
      {
        Label: 'Shipment Detail',
        URL: '#',
        routerLink: ['audit-queue'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Document Queue',
        URL: '#',
        routerLink: ['audit-queue/document'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      },
      {
        Label: 'Audit',
        URL: '#',
        routerLink: ['audit-queue/carrier'],
        operation: '',
        operation2: '',
        type: MenuTypes.Link,
        Children: []
      }
    ]
  }
];

InitialData = Track;
