export type SegmentTemplatesContent={
    id:string,
    name: string,
    nElements:number,
    usage:number,
    maxUse:number,
}

export type PartnerShipsClientContent={
    id:string,
    name:string,
    status:string,
    edi:string,
    connection:string,
}

export type ModalViewDocumentsContent={
    id:string,
    name:string,
    mandatory:string,
}

export type PartnerShipClientTableContent={
    id:string,
    document_name: string,
    mandatory: string|null,
    status: string,
    validated:boolean,
    file: string,
}