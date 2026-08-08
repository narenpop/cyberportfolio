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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    playSuccess();
  };

  return (
    <section id="contact" className="section-container">
      <h2 className="section-title">Contact</h2>

      <div className={styles.grid}>
        <div className={styles.info}>
          <h3 className={styles.tagline}>Let’s build something useful together.</h3>
          <p className={styles.copy}>
            Open to projects, roles, or a quick chat about frontend and full-stack work.
          </p>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <Mail size={18} />
              <div>
                <div className={styles.detailLabel}>Email</div>
                <div className={styles.detailVal}>snaren339@gmail.com</div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <MapPin size={18} />
              <div>
                <div className={styles.detailLabel}>Location</div>
                <div className={styles.detailVal}>Chennai, IN · Remote friendly</div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Clock size={18} />
              <div>
                <div className={styles.detailLabel}>Response</div>
                <div className={styles.detailVal}>Usually within 24 hours</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          {submitSuccess ? (
            <div className={styles.successOverlay}>
              <div className={styles.successIcon}>
                <Check size={28} strokeWidth={2.5} />
              </div>
              <h4 className={styles.successTitle}>Message sent</h4>
              <p className={styles.successText}>Thanks — I’ll get back to you soon.</p>
              <button
                onClick={() => {
                  playClick();
                  setFormData({ name: '', email: '', message: '' });
                  setSubmitSuccess(false);
                }}
                onMouseEnter={playHover}
                className={styles.btnReset}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="form-name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.inputField}
                  id="form-name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="form-email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.inputField}
                  id="form-email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="form-message" className={styles.label}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.inputField}
                  style={{ resize: 'vertical' }}
                  id="form-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={playHover}
                className={styles.btnSubmit}
              >
                {isSubmitting ? (
                  <span>Sending…</span>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
