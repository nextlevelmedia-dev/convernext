import styles from "./AboutManifesto.module.css"

type AboutManifestoProps = {
  eyebrow?: string
  title?: string
  text?: string
  closingText?: string
}

export default function AboutManifesto({
  eyebrow,
  title,
  text,
  closingText,
}: AboutManifestoProps) {
  if (!eyebrow && !title && !text && !closingText) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          {eyebrow && (
            <span className={styles.eyebrow}>
              {eyebrow}
            </span>
          )}

          {title && (
            <h2 className={styles.title}>
              {title}
            </h2>
          )}
        </div>

        <div className={styles.content}>
          {text && (
            <p className={styles.text}>
              {text}
            </p>
          )}

          {closingText && (
            <p className={styles.closing}>
              {closingText}
            </p>
          )}
        </div>

      </div>
    </section>
  )
}