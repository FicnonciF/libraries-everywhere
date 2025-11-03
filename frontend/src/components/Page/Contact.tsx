import React from 'react'
import { sectionContainer, textContainer, h1Title, leadText, bodyText } from '@/styles/typography'

const Contact: React.FC = () => {
    return (
        <section className={`${sectionContainer} text-white`}>
            <div className={textContainer}>
                <h1 className={h1Title}>Contact</h1>
                <p className={leadText}>
                    We'd love to hear from you. Reach out for collaborations, contributions, or general queries.
                </p>
                <p className={bodyText}>
                    Email us at <a href="mailto:info@librarieseverywhere.com" className="underline">info@librarieseverywhere.com</a> and we will get back to you.
                </p>
            </div>
        </section>
    )
}

export default Contact