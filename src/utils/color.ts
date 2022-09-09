export const randomRGB = () => {
  const r = (Math.random() * 255) | 0
  const g = (Math.random() * 255) | 0
  const b = (Math.random() * 255) | 0
  return `rgb(${r}, ${g}, ${b})`
}
