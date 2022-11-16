import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useEffect, useState, useRef, useCallback } from 'react'; 
import data from './data/questions.json';
import project from './data/projects.json'; 

export default function Home() {
  // new Time();
  const app = useRef();
  const option = useRef();
  const [showPreloader, setShowPreloader] = useState(true);
  const [fontFamily , setFontFamily] = useState('VP-Pixel');
  const [opacity, setOpacity] = useState(1);
  const [phopacity, setPhopacity] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);
  
  const [projectType, setProjectType] = useState("All");
  const [selectedProject, setSelectedProject] = useState('All');

  const optionClick = (isCorrect) => {
		if (isCorrect) {
			setScore((score)=> score+20);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < data.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}

    if(score < 5){
      setTryAgain(true);
    }
	};

  const TryAgain = () =>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTryAgain(false);
  }

  const Quiz = () =>{
    return(
      <div className={styles.quiz_section} id="quiz_section">
        <div className={styles.quiz_header}>
          <p className={styles.quiz_title}>{data[currentQuestion].Question}: </p>
          <p className={styles.quiz_number}>{currentQuestion + 1}/{data.length}</p>
        </div>
        <div className={styles.quiz_options}>
          {data[currentQuestion].answerOptions.map((answerOption, index) => (
            <div className={styles.quiz_option} id="quiz_option" ref={option} key={index}>
              <p className={styles.option_name} onClick={()=>optionClick(answerOption.isCorrect)}>{answerOption.answerText}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const [isDoe, setIsDoe] = useState(false);

  useEffect(()=>{
   setTimeout(()=>{
    setFontFamily('CabinetGrotesk-Regular')
   }, 1000)
   setTimeout(()=>{
    setFontFamily('IBMPlexMono-Regular')
   }, 2000)
   setTimeout(()=>{
    setOpacity(0)
   }, 2700)
   setTimeout(()=>{
    let ctx = gsap.context(() => {
      gsap.to("#yuri", {y: -90} );
      // gsap.to("#backend_text", {duration: 1.5, y: "-100%"})
  }, app);
  return () => {
    ctx.revert();
  }
   }, 2750)
   setTimeout(()=>{
    setShowPreloader(false)
   }, 2850)
   setTimeout(()=>{
    let ctx = gsap.context(() => {
      gsap.fromTo("#box_green",  { duration:1.5, y: 550, height: "70vh"}, {y: -690} );
      // gsap.to("#backend_text", {duration: 1.5, y: "-100%"})
  }, app);

  return () => {
    ctx.revert();
  }
   }, 2950)
   let ctf = gsap.context(()=>{
    gsap.from('#marquee', {duration: 1, y: 50, delay: 4, opacity: 0, stagger: 0.25})
    gsap.to
  })
   return () => {
    ctf.revert();
  }
  }, [])

  // gsap.registerPlugin(ScrollTrigger);
  // useEffect(()=>{
  //   gsap.fromTo("#whomoiya",{
  //     opacity: 0,
  //     duration: 2,
  //     x:-40
  //   },
  //   {
  //     opacity: 1,
  //           x: 0,
  //     duration: 2,
  //           scrollTrigger: {
  //             trigger: "#whomoiya",
  //             start: "center center",
  //             end: "bottom center",
  //             scrub: true
  //           }
  //   })
  // })
  // useEffect(() => {
  //   // const element = app.current;
  //   gsap.fromTo(
  //     "#freebie",
  //     {
  //       opacity: 0,
  //       y: -20
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scrollTrigger: {
  //         trigger: "#freebie",
  //         start: "top top",
  //         end: "bottom center",
  //         scrub: true
  //       }
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   const element = ref.current;
  //   gsap.fromTo(
  //     element.querySelector("#gsap-logo"),
  //     {
  //       opacity: 0,
  //       scale: 0.2,
  //       y: -20
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       duration: 1,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: element.querySelector(".first"),
  //         start: "top center",
  //         end: "bottom top",
  //         scrub: true
  //       }
  //     }
  //   );
  // }, []);
  // useEffect(() => {
  //   const element = ref.current;
  //   gsap.from(element.querySelector(".line"), {
  //     scale: 0,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: element.querySelector(".third"),
  //       scrub: true,
  //       start: "top bottom",
  //       end: "top top"
  //     }
  //   });
  // }, []);
 

  useLayoutEffect(()=>{
    let ctd = gsap.context(()=>{
      gsap.from('#quiz_option', {duration: .7, x: -20, opacity: 0, stagger: 0.25})
    });

     return () => {
      ctd.revert();
    }
  }, [currentQuestion])

  useLayoutEffect(()=>{
    let ctd = gsap.context(()=>{
      gsap.fromTo('#projects',{duration:.4, y:0, opacity:0, stagger:0.25 }, {duration: .4, y: -10, opacity:1, stagger: 0.25})
    });

     return () => {
      ctd.revert();
    }
  }, [projectType])

  // const onEnter = ({ currentTarget }) => {
  //   gsap.to(currentTarget, { duration: 1, y: -50 , opacity: 0});
  // };
  
  // const onLeave = ({ currentTarget }) => {
  //   gsap.to(currentTarget, { duration: 1, y: 50, opacity: 1 });
  // };

  const TabHeading = ({title}) => {
    return (
      <>
      <p className={styles.All} onClick={() => {
        setProjectType(title);
        }} style={{
          borderBottom: projectType == title ? "1px solid #151515" : "none",
          transition: "all .2s ease-in-out"
        }}
        >{title}</p>
        <br /><br />
        </>
    )
  }

    let newData = project.reduce(function (obj, v, i){
      obj[v.category] = obj[v.category] || [];
      obj[v.category].push(v);
      return obj;
    }, {});

  const Frontend = () => {
    return(
      <div className={styles.project_lists}>
      {
        newData['Frontend']?.map((project, index)=>(
          <ProjectList year={project.year} projectName={project.title} link={`/project/${project.title.toLowerCase().split(' ').join('-')}`} key={index}/>
        ))
      }
      </div>
    )
  }

  const Backend = () => {
    return(
      <div className={styles.project_lists}>
        {
        newData['Backend']?.map((project, index)=>(
          <ProjectList year={project.year} projectName={project.title} link={`/project/${project.title.toLowerCase().split(' ').join('-')}`} key={index}/>
        ))
      }
    </div>
    )
  }

  const FullStack = () => {
    return(
      <div className={styles.project_lists}>
      {
        newData['Fullstack']?.map((project, index)=>(
          <ProjectList year={project.year} projectName={project.title} link={`/project/${project.title.toLowerCase().split(' ').join('-')}`} key={index}/>
        ))
      }
      </div>
    )
  }
  const ProjectList =({year, projectName, link})=>{
    return (
      <a className={styles.project_list} href={link} id="projects">
        <p className={styles.project_year}>{year}</p>
        <p className={styles.project_name}>{projectName}</p>
      </a>
    )
  }

  const All = () =>{

    return(
      <div className={styles.project_lists}>
            {
              project.map((project, index)=>(
                <ProjectList year={project.year} projectName={project.title} link={`/project/${project.title.toLowerCase().split(' ').join('-')}`} key={index}/>
              ))
            }
      </div>
    )
  }

  const BackendText = () => {
    return(
      <p className={styles.backend_text} id="fredie"> <Image src={'/assets/img/ice-cream.svg'} width={70} height={70} /> BACKEND</p>
    )
  }

  const FrontendText = () => {
    return(
      <p className={styles.frontend_text} id="fredie">FRONTEND <Image src={'/assets/img/Mascot.svg'} width={100} height={100} /></p>
    )
  }

  const FullStackText = () => {
    return(
      <p className={styles.fullstack_text} id="fredie"><Image src={'/assets/img/bomb.svg'} width={70} height={70} /> FULLSTACK</p>
    )
  }

  
  const texts = [ FrontendText, BackendText, FullStackText];

  const [choice, setChoice] = useState(texts[0]);
//  const shuffle = useCallback(()=>{
//   const index = Math.floor(Math.random() * texts.length);
//   setChoice(texts[index])
//  }, []);

//  useEffect(()=>{
//   const intervalID = setInterval(shuffle, 1500);
//   return () => clearInterval(intervalID)
//  }, [shuffle])

const [isHover, setIsHover] = useState(true);

const currentTime = () => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    timeZone: "Africa/Lagos",
  };

  const time = new Intl.DateTimeFormat([], options).format(new Date());
  // let ntime = setTimeout(currentTime(), 1000)

  return time;
}

const [date, setDate] = useState(currentTime());
useEffect(()=>{
  setInterval(()=> setDate(currentTime()), 1000)
}, []);


const [showMenu, setShowMenu] = useState(false);
const choice_job = ["Hello", "How are you", "I'm Cool"];
const [currentIndex, setCurrentIndex] = useState(0);
const carouselInfiniteScroll = () => {
  if(currentIndex === choice_job.length-1){
    return setCurrentIndex(0);
  }
  return setCurrentIndex(currentIndex+1);
} 

useEffect(()=>{
  const interval = setInterval(()=>{carouselInfiniteScroll()}, 2000);
  return () => clearInterval(interval);
})

  return (
    <>
    <div className={ showPreloader ? styles.theboss_pro : styles.theboss}>
        <Head>
        <title>Emmanuel Omoiya - Full Stack Developer</title>
        <meta key="keywords" name="keywords" content={`Emmanuel, Omoiya, Emmanuel Omoiya, Omoiya Emmanuel`} />
        <meta
          key="description"
          name="description"
          content="FullStack Developer"
        />
        <meta key="og-title" property="og:title" content="Emmanuel Omoiya" />
        <meta
          key="og-description"
          property="og:description"
          content="FullStack Developer"
        />
        <meta
          key="og-url"
          property="og:url"
          content={`https://twitter.com/Emmanuel_Omoiya`}
        />
        <meta key="twitter-title" name="twitter:title" content="Emmanuel Omoiya" />
        <meta
          key="twitter-description"
          name="twitter:description"
          content="FullStack Developer"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Emmanuel_Omoiya" />
        <meta
          name="twitter:image"
          content={`/Favicon.svg`}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/Favicon.svg" />
      </Head>
    { showPreloader ? 
    <div className={showPreloader ? styles.Phome : styles.Phome_make} style={{opacity: phopacity}} id="yuri">
      <div className={styles.name} style={{fontFamily: fontFamily, opacity: opacity}}>
        <p className={styles.surname} id="surname">OMOIYA</p>
        <p className={styles.firstname}>EMMANUEL</p>
      </div>
    </div>
    :
    <div className={showPreloader ? styles.home : styles.home_make}>
      <div className={styles.boxes_pro } ref={app}>
        <p className={styles.box_green} id="box_green"></p>
        <p className={styles.box_red} id="box_green"></p>
      </div>
      <div className={styles.hero}>
        <div className={styles.exist_sd}>
          <div className={styles.oed}>
            <a className={styles.gd} href="https://github.com/EmmanuelOmoiya" target="_blank" rel="noreferrer">Github</a>
            <a className={styles.gd} href="https://twitter.com/Emmanuel_Omoiya" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        <div className={styles.header}>
          <div className={styles.main_header} onMouseEnter={()=> setIsHover(!isHover)} onMouseLeave={()=> setIsHover(!isHover)} style={{ transition: "all .2s ease-in-out"}}>
            {
              isHover ?
            <Image src={'/assets/img/Broken-bone.svg'} width={370} height={50} alt="Broken bone" id='image' style={{ transition: "all .2s ease-in-out"}} onClick={()=> setShowMenu(!showMenu)}/>
            :
            <p className={styles.head_name} style={{ transition: "all .2s ease-in-out"}} >OMOIYA</p>
            }
          </div>
        </div>
        <div className={styles.res}>
          <a className={styles.gd} href="https://www.linkedin.com/in/emmanuelomoiya/" target="_blank" rel="noreferrer">Linkedin</a>
          <p className={styles.gd_time}>{date.slice(0, date.length-2)} WAT</p>
        </div>
        <div className={showMenu ? styles.menu_activ : styles.menu} style={{ transition: "all .2s ease-in-out" }}>
        <br />
        <div className={styles.header_op}>
          <div className={styles.main_header_op} onMouseEnter={()=> setIsHover(!isHover)} onMouseLeave={()=> setIsHover(!isHover)} style={{ transition: "all .2s ease-in-out"}}>
            <p className={styles.head_name_op} style={{ transition: "all .2s ease-in-out", cursor: 'pointer'}} onClick={()=> setShowMenu(!showMenu)}>OMOIYA</p>
          </div>
        </div>
          <p><a className={styles.github_men} target="_blank" href="https://github.com/EmmanuelOmoiya" rel="noreferrer">Github</a></p>
          <p><a className={styles.linkedin_men} target="_blank" href="https://linkedin/in/emmanuelomoiya" rel="noreferrer">LinkedIn</a></p>
          <p><a className={styles.twitter_men} target="_blank" href="https://twitter.com/Emmanuel_Omoiya" rel="noreferrer">Twitter</a></p>
          <p className={styles.time_men}>{date.slice(0, date.length-2)} WAT</p>
        </div>
        </div>
        <div className={styles.freelance} id="freediv">
          <p className={styles.frel} id="freelance">FREELANCE</p>
          {/* <div className={styles.choice_job}>
          <span className={styles.frontd_t}><FrontendText /></span>
          <span className={styles.backd_t}><BackendText /></span> 
            <p style={{ transform:`translateY(-${currentIndex * 100}%)` }} className={styles.carousel_item} >
            {texts[0]}
            </p>
          </div> */}
          <div className={styles.choice_job}>
          {
            [< FrontendText />, < BackendText />, <FullStackText />].map((item, index)=>{
              return <p className={styles.carousel_item} key={index}  style={{ transform:`translateY(-${currentIndex * 10}rem)` }} >{item}</p>
            })
          }
          </div>
          <p className={styles.dev} id="developer">DEVELOPER</p>
        </div>
        <p className={styles.hero_quote} id="dbestperson">The best person to ever do &apos;it&apos; and also a very humble individual. Currently <b>available to work</b> </p>
      </div>
      <div className={styles.whomoiya}>
        <div className={styles.fes}>
        <div className={styles.redft}>
          <div className={styles.head_spch} >
            <p id="whomoiya"> WH<span className={styles.hollow} id="whomoiya">O</span></p><span className={styles.hollow}>MOIYA</span>
          </div>
          <p className={styles.find_out} id="findoutsimilar">Find out how similar we are by taking the &apos;get to know me&apos; quiz</p>
        </div>
        <Image src={'/assets/img/Detective.svg'} width={280} height={360} alt="Emmanuel" id="detectiveimg"/>
        </div>
        {showScore ? (
				<div className={styles.score_section}>
					<p className={styles.score_prompt}>You are {score}% similar</p>
          { tryAgain ? <p className={styles.tryagain} onClick={()=> TryAgain()} id="quiz_option">TRY + AGAIN</p> : ""}
				</div>
			) : (
					<Quiz />
			)}
      </div>
        <div className={styles.projects_section} >
          <div className={styles.projects_header} id="projects_header">
           {
            (["All","Frontend","Backend","Fullstack"]).map((tab,index)=>(
              <TabHeading title={tab} key={index} />
            ))
           }
          </div>
          {(() => {
                  switch (projectType) {
                    case "All":
                      return (
                        <All />
                      );
                    case "Frontend":
                      return (
                        <Frontend />
                      );
                    case "Backend":
                      return (
                        <Backend />
                      );
                      case "Fullstack":
                        return(
                          <FullStack />
                        )
                    default:
                      return <All />;
                  }
                })()}
             
        </div>
    </div> 
    } 
    <div className={styles.footer} >
      <div className={styles.marquee} >
        <p className={styles.email}><a href="mailto:emmanuelomoiya6@gmail.com" className={styles.email}>emmanuelomoiya6@gmail.com</a></p>
        <p className={styles.got_a_joke}>got a good joke?</p>
      </div>
      <div className={styles.flonks} id="flonks">
        <p className={styles.designed_by}><a href="https://jojosportfolio.notion.site/JOJO-AKINDE-eafadbc4622348feb24bc65842ab4e52" className={styles.flink}>Design by Jojo</a></p>
        <div className={styles.flinks}>
          <a href="https://twitter.com/tayosverse" className={styles.flink}>tw</a>
          <a href="https://dribbble.com/jojo393" className={styles.flink}>dr</a>
          <a href="https://www.linkedin.com/in/akindejojo/" className={styles.flink}>ln</a>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
