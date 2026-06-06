'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const { playClick, playHover, playSuccess } = useAudio();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    // Simulate database transmission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    playSuccess(); // Play upbeat synthesizer chord arpeggio
  };

  const handleReset = () => {
    playClick();
    setFormData({ name: '', email: '', message: '' });
    setSubmitSuccess(false);
  };

  return (
    <section id="contact" className={`section-container ${styles.contact}`}>
      <h2 className="section-title">Contact</h2>

      <div className={styles.grid}>
        {/* Left Side: General Info details */}
        <div className={styles.info}>
          <h3 className={styles.tagline}>
            LET&apos;S CO-CREATE <span className={styles.highlight}>SOMETHING EXTRAORDINARY</span>.
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Have a project idea, contract opening, or simply want to chat about creative frontend engineering? 
            Drop a message, and I will establish communication shortly.
          </p>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <div className={styles.iconWrapper}>
                <Mail size={18} />
              </div>
              <div>
                <div className={styles.detailLabel}>Email Channel</div>
                <div className={styles.detailVal}>snaren339@gmail.com</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={18} />
              </div>
              <div>
                <div className={styles.detailLabel}>Base Coordinate</div>
                <div className={styles.detailVal}>chennai, IN (Remote Friendly)</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.iconWrapper}>
                <Clock size={18} />
              </div>
              <div>
                <div className={styles.detailLabel}>Latency Response</div>
                <div className={styles.detailVal}>Under 24 Standard Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className={styles.formCard}>
          {submitSuccess && (
            <div className={styles.successOverlay}>
              <div className={styles.successIcon}>
                <Check size={32} strokeWidth={2.5} />
              </div>
              <h4 className={styles.successTitle}>Transmission Successful</h4>
              <p className={styles.successText}>Message logged into main console datastore.</p>
              <button onClick={handleReset} onMouseEnter={playHover} className={styles.btnReset}>
                Send Another Message
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                required
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                id="form-name"
              />
              <label htmlFor="form-name" className={styles.floatingLabel}>Your Name</label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                id="form-email"
              />
              <label htmlFor="form-email" className={styles.floatingLabel}>Your Email</label>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                required
                rows={5}
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                className={styles.inputField}
                style={{ resize: 'vertical' }}
                id="form-message"
              />
              <label htmlFor="form-message" className={styles.floatingLabel}>Your Message</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={playHover}
              className={styles.btnSubmit}
            >
              {isSubmitting ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
