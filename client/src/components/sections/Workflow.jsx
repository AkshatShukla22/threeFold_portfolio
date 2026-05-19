import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '../../hooks/index';
import './Workflow.css';

const steps = [
  { title: 'Discovery',   desc: 'We understand your goals, audience and technical requirements.',   icon: 'fa-solid fa-magnifying-glass', num: '01' },
  { title: 'Planning',    desc: 'Architecture, milestone roadmap and tech stack selection.',          icon: 'fa-solid fa-diagram-project',  num: '02' },
  { title: 'Design',      desc: 'Stunning UI/UX prototypes and component design systems.',           icon: 'fa-solid fa-pen-ruler',         num: '03' },
  { title: 'Development', desc: 'Clean, scalable, production-ready code — sprint by sprint.',        icon: 'fa-solid fa-code',              num: '04' },
  { title: 'Testing',     desc: 'Rigorous QA, performance audits and security hardening.',           icon: 'fa-solid fa-vial',              num: '05' },
  { title: 'Launch',      desc: 'Deployment, monitoring and dedicated post-launch support.',         icon: 'fa-solid fa-rocket',            num: '06' },
];

export default function Workflow() {
  const ref    = useScrollReveal();
  const secRef = useRef(null);

  // 'end 80%' ensures the fill line stops as the last node enters view,
  // preventing the line from animating beyond the final step.
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ['start 80%', 'end 80%'],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section workflow-sec" ref={secRef}>
      <div className="container">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label"><i className="fa-solid fa-arrows-spin"></i>How We Work</span>
          <h2 className="section-title">Our <span>Process</span></h2>
          <p className="section-sub">A proven 6-step methodology that delivers results on time and on budget.</p>
        </div>

        <div className="workflow-track">
          {/* Animated vertical line */}
          <div className="wf-line-track">
            <motion.div className="wf-line-fill" style={{ height: lineH }} />
          </div>

          {steps.map((step, i) => (
            <motion.div key={i} className={`wf-step ${i % 2 === 0 ? 'wf-left' : 'wf-right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="wf-node">
                <div className="wf-node-inner"><i className={step.icon}></i></div>
              </div>
              <div className="wf-card">
                <span className="wf-num">{step.num}</span>
                <h3 className="wf-title">{step.title}</h3>
                <p className="wf-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}