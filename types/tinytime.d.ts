declare module 'tinytime' {
  interface TinyTimeRenderer {
    render: (date: Date) => string
  }
  function tinytime (template: string, options?: { padDays?: boolean, padHours?: boolean, padMonth?: boolean }): TinyTimeRenderer
  export default tinytime
}
