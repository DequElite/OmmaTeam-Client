import { useNavigate } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import OmmaCard from "../../components/OmmaCards/OmmaCards.component";
import styles from './style.module.scss';
import { useEffect, useMemo, useState } from "react";
import { OmmaCardsProps } from "../../api/types/props.types";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeLayout() {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [currentCardSlide, setCurrentCardSlide] = useState(0);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 600);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
      const interval = setInterval(()=>{
        setCurrentCardSlide(prevState => (prevState + 1) % cards.length);
      },5000);

      return () => clearInterval(interval);
    }
    , []);

    const cards = useMemo(()=>{
      return [
        {
          iconPath: "/icons/TeamIcon.png",
          title: "Work in team",
          desc: "Join or create teams, easily manage tasks, and keep track of your progress with insightful statistics!",
          buttonText: "Create team",
          link: "/teams"
        },
        {
          iconPath: "/icons/ChatIcon.png",
          title: "Team Chat",
          desc: "Engage in quick, clear, and seamless conversations with your teammates in the team chat!",
          buttonText: "Let’s work",
          link: "/chat"
        },
        {
          iconPath: "/icons/GraphIcon.png",
          title: "Task Management Made Simple",
          desc: "Assign tasks, track progress, and collaborate with your team. Manage deadlines, priorities, and subtasks effortlessly!",
          buttonText: "Get Started",
          link: "/tasks"
        }
      ]
    }, [])
  
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
                <span className={styles['homelayout__first-button-text']}>Get Started</span>
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
            {
              isSmallScreen
              ? (
                cards.map((card: OmmaCardsProps) => (
                  <OmmaCard
                    key={card.link}
                    {...card}
                    width={100} 
                    height={100}
                    style={{
                      transform: `translateX(-${currentCardSlide * 100 + (currentCardSlide * 10)}%)`,
                      transition: 'transform 0.5s ease-in-out',
                    }}
                  />
                ))
              ) 
              : (
                cards.map((card: OmmaCardsProps) => (
                  <OmmaCard
                    key={card.link}
                    {...card}
                    width={isSmallScreen ? 100 : 100 / 3.5} 
                    height={100}
                  />
                ))
              )
            }
          </div>
        </section>
      </main>
    );
  }