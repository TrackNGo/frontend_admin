interface TextBoxType{
    title:string,
    type:string,
    placeholder?:string,
    name:string,
    onChange?:any,
    onClick?:any,
    value?:string,
    readOnly?: boolean
}

export default TextBoxType