import React from 'react'
import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container}>
        <span>Leonardo Maceroli</span>
        <a href="https://github.com/LeonardoMaceroli/Proyecto.React" rel='noopener noreferrer' target='_blank'>Github</a>
        <p>Proyecto React-2024</p>
    </footer>
  )
}

export default Footer