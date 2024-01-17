export default function useInput() {
    const setInputErrorStyle = (type) => {
        const input = document.querySelector(`.input-${type}`)
        input.style = 'border: 1px solid red;'
        input.addEventListener('click', () => {
            input.style = ''
            input.removeEventListener('click', () => {
            }, true)
        })
    }
    return {
        setInputErrorStyle
    }

}