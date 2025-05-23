import { useNavigate } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import OmmaCard from "../../components/OmmaCards/OmmaCards.component";
import styles from './style.module.scss';
import { useEffect, useMemo, useState } from "react";
import { OmmaCardsProps } from "../../api/types/props.types";
import useIsScreenWidth from "../../hooks/useIsScreenWidth";
import { useAppSelector } from "../../store/store";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useTranslation } from "react-i18next";

export default function HomeLayout() {
    const userProfileState = useAppSelector(state => state.userProfile);
    const navigate = useNavigate();
    const [currentCardSlide, setCurrentCardSlide] = useState(0);
    const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });

    const { updateState } = useMessageBox();
    const { t } = useTranslation(); 

    useEffect(()=>{
      const interval = setInterval(()=>{
        setCurrentCardSlide(prevState => (prevState + 1) % OmmaCards.length);
      },5000);

      return () => clearInterval(interval);
    }
    , []);

    const OmmaCards = [
        {
          iconPath: "/icons/TeamIcon.png",
          title: t("omma_desc.cards.workInTeam.title"),
          desc: t("omma_desc.cards.workInTeam.desc"),
          buttonText: t("buttons.createTeam"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : ''}`
        },
        {
          iconPath: "/icons/ChatIcon.png",
          title: t("omma_desc.cards.teamChat.title"),
          desc: t("omma_desc.cards.teamChat.desc"),
          buttonText: t("buttons.letWork"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : ''}`
        },
        {
          iconPath: "/icons/GraphIcon.png",
          title: t("omma_desc.cards.taskMMSimple.title"),
          desc: t("omma_desc.cards.taskMMSimple.desc"),
          buttonText: t("buttons.getStarted"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : ''}`
        }
      ]
  
    const handleClick = () => {
      if(userProfileState.status.isAuth) {
        navigate({ to: '' });
        updateState({
          isOpened: true,
          type: 'success',
          desc: `Welcome back, ${userProfileState.username}`
        })
      } else if (!userProfileState.status.isAuth) {
        navigate({ to: '/auth/signup' });
      }
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
                <strong>{t("omma_desc.desc")}</strong>
              </h4>
            </div>
            <div className={styles['homelayout__first-button']}>
              <Button 
                variant="dark" 
                width={100} 
                height={8} 
                animation={true} 
                onClick={handleClick}>
                <span className={styles['homelayout__first-button-text']}>
                  {t("buttons.getStarted")}
                </span>
              </Button>
            </div>
          </div>
        </section>
  
        <section className={styles['homelayout__second']}>
          <header className={styles['homelayout__second-header']}>
            <img src="/icons/OmmaTeam.png" alt="OmmaTeam Logo" />
            <h3>{t("omma_desc.small_desc")}</h3>
          </header>
          <div className={styles['homelayout__second-cards']}>
            {
              isSmallScreen
              ? (
                OmmaCards.map((card: OmmaCardsProps) => (
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
                OmmaCards.map((card: OmmaCardsProps, index: number) => (
                  <OmmaCard
                    key={index}
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