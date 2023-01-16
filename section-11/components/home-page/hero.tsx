import Image from "next/image";
import s from "./hero.module.css";

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={s.image}>
        <Image
          src={"/images/site/max.png"}
          alt='Maximilian Schwarzmüller'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, i&apos;m Max</h1>
      <p>
        I blog about web development - especially front-end frameworks like
        Angular or React.
      </p>
    </section>
  );
};

export default Hero;
