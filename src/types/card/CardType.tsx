interface CardType {
    title: string
    description: string
    iconClass: string
    iconColor: string
    onManage?: () => void
}

export default CardType