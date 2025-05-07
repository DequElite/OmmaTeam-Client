import Button from "../../components/Button/Button.component";
import OmmaCard from "../../components/OmmaCards/OmmaCards.component";
import styles from './style.module.scss';

export default function HomeLayout() {
    return (
      <main className={styles['homelayout']}>
        <section className={styles['homelayout__first']}>
          <div className={styles['homelayout__first-container']}>
            <header className={styles['homelayout__first-header']}>
              <h1>OmmaTeam</h1>
            </header>
            <div className={styles['homelayout__first-desc']}>
              <h4>
                <strong>Perform team tasks conveniently and quickly</strong>
              </h4>
            </div>
            <div className={styles['homelayout__first-button']}>
              <Button variant="dark" width={100} height={8} animation={true}>
                <span style={{fontSize:'1.2rem'}}>Get Started</span>
              </Button>
            </div>
          </div>
        </section>
  
        <section className={styles['homelayout__second']}>
          <header className={styles['homelayout__second-header']}>
            <img src="/icons/OmmaTeam.png" alt="OmmaTeam Logo" />
            <h3>OmmaTeam - Fast and convenient</h3>
          </header>
          <div className={styles['homelayout__second-cards']}>
            <OmmaCard 
                iconPath="/icons/TeamIcon.png"
                title="d"
                desc=""
                buttonText=""
                link=""
                width={10}
                height={10}
            ></OmmaCard>
          </div>
        </section>
      </main>
    );
  }
  
