import projects from '../data/projects.json';
import Head from 'next/head'
import Image from 'next/image'
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
import {useRouter} from "next/router"
import Link from 'next/link';

export async function getStaticPaths(){
  const ids =  projects.map((project)=> project.title.toLowerCase().split(' ').join('-'));
  console.log(ids)
  const paths = ids.map((id)=>({
    params: {
      id:id
    }
  })) ;
  console.log(paths)
  return{
    paths,
    fallback: false
  };
};

export const getStaticProps = async({params}) => {
const { id } = params;
const red = id.split('-').join(' ').toString();
  const projectInfo = projects.find((project)=> project.title.toString().toLocaleLowerCase() === red );
  console.log(projectInfo.category)
  let newData = projects.reduce(function (obj, v, i){
    obj[v.category] = obj[v.category] || [];
    obj[v.category].push(v);
    return obj;
  }, {});
  let cat = newData[projectInfo.category];
  return{
    props: {
      projectInfo,
      cat
    },
  };
};

const Projects = ({projectInfo, cat}) => {
  const router = useRouter();
  useLayoutEffect(() => {
    let cti = gsap.context(()=>{
      gsap.to('#did',{duration:1, y:  -4, opacity:1, stagger:0.25 })
    });

     return () => {
      cti.revert();
    }
  }, [])
  return (
    <>
            <Head>
        <title>Emmanuel Omoiya - {projectInfo?.title}</title>
        <meta key="keywords" name="keywords" content={`Emmanuel, Omoiya, Emmanuel Omoiya, Omoiya Emmanuel`} />
        <meta
          key="description"
          name="description"
          content="My personal portfolio "
        />
        <meta key="og-title" property="og:title" content="Emmanuel Omoiya" />
        <meta
          key="og-description"
          property="og:description"
          content="My personal portfolio"
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
          content="My personal portfolio"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Emmanuel_Omoiya" />
        <meta
          name="twitter:image"
          content={`https://epic.asva.com/assets/medialogo.png`}
        />
      </Head>
    <div className={styles.project}>
      <div className={styles.project_image}>
        <img src={projectInfo?.img} alt={projectInfo?.title} className={styles.project_imggg}/>
      </div>
      <div className={styles.gtr}>
        <div className={styles.project_details}>
          <p className={styles.project_detail_name} id="did">{projectInfo?.title}</p>
          <p className={styles.project_detail_description} id="did">Passionate developer who loves to take on new challenges and explore new terrain. Currently available to work</p>
          <div className={styles.derc}>
            <a className={styles.project_detail_link} id="did" href={projectInfo?.link} target="_blank" rel='noopener noreferrer'>Check it out <Image src={'/assets/img/Arrow.svg'} width={10} height={10} alt="Arrow"/></a>
            <p className={styles.project_detail_next}id="did">Next: Coming Money Pro</p>
          </div>
        </div>
        <div className={styles.project_marquee}>
          {
            cat?.map((category)=>(
              <>
              <a className={styles.mlink} href={`/project/${category.title.toLowerCase().split(' ').join('-')}`} >{category.title}</a><span>/</span>
              </>
            ))
          }
        </div>
        <p className={styles.project_close} onClick={()=> router.back()}>[X] Close</p>
    </div>
    </div>
    </>
  )
}

export default Projects;


