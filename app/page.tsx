'use client';

import CardSwap, { Card } from './components/CardSwap/CardSwap';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';
import Dither from '@/app/components/Dither/Dither';
import TextType from '@/app/components/TextType/TextType';
import FlowingMenu from '@/app/components/FlowingMenu/FlowingMenu';
import StaggeredMenu from '@/app/components/StaggeredMenu/StaggeredMenu';
import './about-section.css';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' }
  // { label: 'Services', ariaLabel: 'View our services', link: '#services' },
  // { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/lieoxa' },
  { label: 'Instagram', link: 'https://instagram.com/lieoxa' },
  { label: 'Email', link: 'mailto:adrielfelixposuma@gmail.com' }
];

export default function Home() {
  return (
    <>
      <section id='home' style={{ height: '100vh', position: 'relative', backgroundColor: '#000' }}>
        <Dither
          waveColor={[0.792, 0, 0.765]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={['#3d006b', '#ca00c3']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#ca00c3"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
        <TextType
          text={["Building digital experiences.", "Crafting clean & modern UI.", "Full-stack web developer."]}
          typingSpeed={60}
          pauseDuration={1800}
          showCursor
          cursorCharacter="|"
          deletingSpeed={35}
          cursorBlinkDuration={0.5}
          className="hero-texttype"
        />
        <div className="hero-name">
          Adriel Felix Posuma
        </div>
      </section>

      <section id='about' className="about-section">
        <div className="about-bg-glow" />

        <div className="about-profile-col">
          <ProfileCard
            name="Adriel Felix Posuma"
            title="Web Developer"
            handle="lieoxa"
            status="Open to work"
            contactText="Hire Me"
            avatarUrl="/code-gabut/avatar.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log('Contact clicked')}
            behindGlowColor="rgba(202, 0, 195, 0.18)"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg, #1a0028 0%, #080010 60%, #120020 100%)"
          />
        </div>

        <div className="about-cards-col">
          <div className="about-cards-label">
            <span className="about-cards-tag">— A bit about me</span>
            <h2 className="about-cards-title">Who I am &<br />what I do</h2>
          </div>
          <div className="about-cardswap-wrap">
            <CardSwap
              width={340}
              height={220}
              cardDistance={50}
              verticalDistance={60}
              delay={4000}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              <Card customClass="about-card about-card--skills">
                <div className="ac-inner">
                  <div className="ac-icon">⚡</div>
                  <h3 className="ac-title">Tech Stack</h3>
                  <div className="ac-tags">
                    <span>React</span><span>Next.js</span><span>TypeScript</span>
                    <span>Node.js</span><span>Tailwind</span><span>GSAP</span>
                  </div>
                </div>
              </Card>

              <Card customClass="about-card about-card--projects">
                <div className="ac-inner">
                  <div className="ac-icon">🚀</div>
                  <h3 className="ac-title">Projects</h3>
                  <p className="ac-desc">Building modern web experiences — from interactive portfolios to full-stack apps with clean UI & smooth animations.</p>
                </div>
              </Card>

              <Card customClass="about-card about-card--hire">
                <div className="ac-inner">
                  <div className="ac-icon">✨</div>
                  <h3 className="ac-title">Let's Work Together</h3>
                  <p className="ac-desc">Available for freelance & collaboration. I turn ideas into beautiful, performant digital products.</p>
                  <a href="mailto:adrielfelixposuma@gmail.com" className="ac-cta">Get in touch →</a>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>
    </>
  );
}
