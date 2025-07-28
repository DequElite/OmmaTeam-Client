import { Link, useNavigate } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import OmmaCard from "../../components/OmmaCards/OmmaCards.component";
import styles from './style.module.scss';
import { useEffect, useRef, useState } from "react";
import { OmmaCardsProps } from "../../api/types/props.types";
import useIsScreenWidth from "../../hooks/useIsScreenWidth";
import { useAppSelector } from "../../store/store";
// import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useTranslation } from "react-i18next";
import { ModerationService } from "../../api/services/Moderation.service";
import { useQuery } from "@tanstack/react-query";
import { Feedback } from "../../api/types/moderation.types";
import WindowLoading from "../../components/Loading/WindowLoading.component";
import OmmaFeedback from "../../components/OmmaFeedback/OmmaFeedback.component";
// import OmmaFeedback from "../../components/OmmaFeedback/OmmaFeedback.component";

const moderationService = new ModerationService();

export default function HomeLayout() {
    const userProfileState = useAppSelector(state => state.userProfile);
    const navigate = useNavigate();
    const [currentCardSlide, setCurrentCardSlide] = useState(0);
    const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });

    const feedbacksRef = useRef<HTMLDivElement | null>(null);
    const [isFeedbacksHovered, setIsFeedbacksHovered] = useState(false);

    const [headerprevScrollPos, setheaderPrevScrollPos] = useState(0);
    const [headervisible, setheaderVisible] = useState(true);

    // const { updateState } = useMessageBox();
    const { t } = useTranslation(); 

    useEffect(()=>{
      const interval = setInterval(()=>{
        setCurrentCardSlide(prevState => (prevState + 1) % OmmaCards.length);
      },5000);

      return () => clearInterval(interval);
    }
    , []);

    useEffect(()=>{
        const interval = setInterval(() => {
          if (feedbacksRef.current && !isFeedbacksHovered) {
            const container = feedbacksRef.current;
            const scrollAmount = 20;

            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;

            if (isAtEnd) {
              container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
              container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
          }
        }, 50);

        return () => clearInterval(interval);
    }, [isFeedbacksHovered]);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const isVisible = headerprevScrollPos > currentScrollPos || currentScrollPos < 50;

        setheaderVisible(isVisible);
        setheaderPrevScrollPos(currentScrollPos);
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, [headerprevScrollPos]);

    const OmmaCards = [
        {
          iconPath: "/icons/TeamIcon.png",
          title: t("omma_desc.cards.workInTeam.title"),
          desc: t("omma_desc.cards.workInTeam.desc"),
          buttonText: t("buttons.createTeam"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : '/dashboard'}`
        },
        {
          iconPath: "/icons/ChatIcon.png",
          title: t("omma_desc.cards.teamChat.title"),
          desc: t("omma_desc.cards.teamChat.desc"),
          buttonText: t("buttons.letWork"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : '/dashboard'}`
        },
        {
          iconPath: "/icons/GraphIcon.png",
          title: t("omma_desc.cards.taskMMSimple.title"),
          desc: t("omma_desc.cards.taskMMSimple.desc"),
          buttonText: t("buttons.getStarted"),
          link: `${!userProfileState.status.isAuth ? "/auth/signup" : '/dashboard'}`
        }
      ]

    const { data, isLoading } = useQuery<Feedback[]>({
      queryKey: ["feedbacks"],
      queryFn: () => moderationService.getPositiveFeedbacks().then(res => res.data.feedbacks),
    });

    const handleClick = async (nav: string, elseNav: string) => {
      if(userProfileState.status.isAuth) {
        navigate({ to: nav });
        // updateState({
        //   isOpened: true,
        //   type: 'success',
        //   desc: `Welcome back, ${userProfileState.username}`
        // })
      } else if (!userProfileState.status.isAuth) {
        navigate({ to: elseNav });
      }
    }

    if(isLoading) {
      return <WindowLoading />;
    }

    return (
      <main className={styles['homelayout']}>
        <header className={`${styles.header} ${!headervisible ? styles.headerHidden : ''}`}>
          <div className={styles['header__sponsor']}>
            <img src="/icons/OmmaTeam.png" alt="OmmaTeam Logo" />
            {
              !userProfileState.status.isAuth &&
              <Button 
                variant='light'
                width={40} 
                height={6.5} 
                animation={true} 
                onClick={() => window.location.href='https://opencollective.com/ommateam'}>
                <span style={{fontSize: '1.1rem', fontWeight: 'bolder'}}>
                  {t("buttons.become_a_sponsor")}
                </span>
              </Button>
            }
          </div>
          <nav className={styles['header__nav']}>
            <Link to={'#first'}>Main</Link>
            <Link to={'#second'}>About</Link>
            <Link to={'#third'}>Feedbacks</Link>
          </nav>
          <div className={styles['header__login']}>
            {
              !userProfileState.status.isAuth ? (
                <>
                  <Button 
                    variant='dark-border' 
                    width={30} 
                    height={6} 
                    onClick={() => handleClick('/dashboard', '/auth/login')}>
                    <span style={{fontSize: '1rem'}}>
                      LogIn
                    </span>
                  </Button>
                  <Button 
                    variant='branded' 
                    width={30} 
                    height={6} 
                    onClick={() => handleClick('/dashboard', '/auth/signup')}>
                    <span style={{fontSize: '1rem'}}>
                      Sign Up
                    </span>
                  </Button>
                </>
              ) : (
                <Button 
                  variant='light'
                  width={40} 
                  height={6} 
                  animation={true} 
                  onClick={() => window.location.href='https://opencollective.com/ommateam'}>
                  <span style={{fontSize: '1rem'}}>
                    {t("buttons.become_a_sponsor")}
                  </span>
                </Button>
              )
            }
          </div>
        </header>
        <section className={styles['homelayout__first']} id="first">
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
                onClick={() => handleClick('/dashboard', '/auth/signup')}>
                <span className={styles['homelayout__first-button-text']}>
                  {t("buttons.getStarted")}
                </span>
              </Button>
              <div className={styles['homelayout__first-buttons']}>
                <Button 
                  variant='light'
                  width={100} 
                  height={7} 
                  onClick={() => window.location.href='https://opencollective.com/ommateam'}>
                  <span className={styles['homelayout__first-button-text']}>
                    {t("buttons.become_a_sponsor")}
                  </span>
                </Button>
                <Button 
                  variant='branded-reverese'
                  width={100} 
                  height={7} 
                  onClick={() => handleClick('/feedback', '/auth/signup')}>
                  <span className={styles['homelayout__first-button-text']}>
                    {t("buttons.rate_platform")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className={styles['homelayout__second']} id="second">
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
                    key={card.buttonText}
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
        <section className={styles['homelayout__third']} id="third">
          <header className={styles['homelayout__third-header']}>
            <img src="/icons/OmmaTeam.png" alt="OmmaTeam Logo" />
            <h3>{data?.length} Positive Feedbacks</h3>
          </header>
          <div 
            ref={feedbacksRef} 
            className={styles['homelayout__third-cards']}
            onMouseEnter={() => setIsFeedbacksHovered(true)}
            onMouseLeave={() => setIsFeedbacksHovered(false)}
          >
            {/* <OmmaFeedback 
              username="DequElite" 
              rate='EXCELLENT' 
              desc="Easily assign tasks, track progress, and collaborate with your team. Manage deadlines, priorities, and subtasks effortlessly for maximum productivity!" 
              width={350} 
              height={70}
            /> */}
            {
              data && data.map((fd) => (
                <OmmaFeedback 
                  username={fd.user.username}
                  rate={fd.rate}
                  desc={fd.desc}
                  width={350} 
                  height={70}
                  key={fd.id}
                />
              ))
            }
          </div>
        </section>
      </main>
    );
  }