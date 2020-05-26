export default interface ReduxStateInterface {
    todos: Array<{
        id: number
        title: string
        completed?: boolean
    }>
    loading?: boolean
    error?: boolean
}