import styles from "./AboutFounder.module.css"

type AboutFounderProps = {
  eyebrow?: string
  title?: string
  name?: string
  role?: string
  text?: string
  image?: {
    asset?: {
      url?: string
    }
  }
  imageAlt?: string
}

export default function AboutFounder({
  eyebrow,
  title,
  name,
  role,
  text,
  image,
  imageAlt,
}: AboutFounderProps) {
  const imageUrl = image?.asset?.url

  console.log("FOUNDER IMAGE:", imageUrl)

  if (!eyebrow && !title && !name && !role && !text && !imageUrl) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.media}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || name || "Founder NEXT"}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              Immagine non disponibile
            </div>
          )}
        </div>

        <div className={styles.content}>

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

          {(name || role) && (
            <div className={styles.identity}>
              {name && (
                <strong className={styles.name}>
                  {name}
                </strong>
              )}

              {role && (
                <span className={styles.role}>
                  {role}
                </span>
              )}
            </div>
          )}

          {text && (
            <p className={styles.text}>
              {text}
            </p>
          )}

        </div>

      </div>
    </section>
  )
}