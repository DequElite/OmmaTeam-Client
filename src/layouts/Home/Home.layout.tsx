import { useNavigate } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import OmmaCard from "../../components/OmmaCards/OmmaCards.component";
import styles from './style.module.scss';

export default function HomeLayout() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate({ to: '' });
    }

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
              <Button 
                variant="dark" 
                width={100} 
                height={8} 
                animation={true} 
                onClick={handleClick}>
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
                title="Work in team"
                desc="Join or create teams, easily manage tasks, and keep track of your progress with insightful statistics!"
                buttonText="Create team"
                link="/"
                width={100/3.5}
                height={100}
            ></OmmaCard>
            <OmmaCard 
                iconPath="/icons/ChatIcon.png"
                title="Work in team"
                desc="Engage in quick, clear, and seamless conversations with your teammates in the team chat!"
                buttonText="Let`s work"
                link="/"
                width={100/3.5}
                height={100}
            ></OmmaCard>
            <OmmaCard 
                iconPath="/icons/TeamIcon.png"
                title="Task Management Made Simple"
                desc="Easily assign tasks, track progress, and collaborate with your team. Manage deadlines, priorities, and subtasks effortlessly for maximum productivity!"
                buttonText="Get Started"
                link="/"
                width={100/3.5}
                height={100}
            ></OmmaCard>
          </div>
        </section>
      </main>
    );
  }
  
