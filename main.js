/* ==========================================================================
   huzla LANDING PAGE ACTIONS & INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. MOBILE MENU TOGGLE --- */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Accessibility update
      const isExpanded = mobileMenuToggle.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking navigation links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  /* --- 2. MULTI-STEP SIGNUP MODAL --- */
  const joinModal = document.getElementById('join-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const joinTriggers = document.querySelectorAll('.join-trigger');
  
  const step1 = document.getElementById('form-step-1');
  const step2 = document.getElementById('form-step-2');
  const step3 = document.getElementById('form-step-3');
  
  const step1Next = document.getElementById('step1-next-btn');
  const step2Prev = document.getElementById('step2-prev-btn');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const joinForm = document.getElementById('join-form');
  const successDoneBtn = document.getElementById('success-done-btn');

  // Input elements for validation
  const inputName = document.getElementById('input-name');
  const selectCategory = document.getElementById('select-category');
  const inputBrand = document.getElementById('input-brand');
  const textareaPitch = document.getElementById('textarea-pitch');
  const inputWhatsapp = document.getElementById('input-whatsapp');

  const openModal = () => {
    joinModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    resetModal();
  };

  const closeModal = () => {
    joinModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scrolling
  };

  const resetModal = () => {
    step1.classList.add('active');
    step2.classList.remove('active');
    step3.classList.remove('active');
    progressBarFill.style.width = '33.33%';
    joinForm.reset();
  };

  joinTriggers.forEach(trigger => trigger.addEventListener('click', openModal));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (successDoneBtn) successDoneBtn.addEventListener('click', closeModal);

  // Close modal when clicking on overlay background
  joinModal.addEventListener('click', (e) => {
    if (e.target === joinModal) {
      closeModal();
    }
  });

  // Modal Step 1 -> Step 2
  if (step1Next) {
    step1Next.addEventListener('click', () => {
      // Validate inputs in Step 1
      if (!inputName.value || !selectCategory.value) {
        inputName.reportValidity() || selectCategory.reportValidity();
        return;
      }
      
      step1.classList.remove('active');
      step2.classList.add('active');
      progressBarFill.style.width = '66.66%';
    });
  }

  // Modal Step 2 -> Step 1
  if (step2Prev) {
    step2Prev.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
      progressBarFill.style.width = '33.33%';
    });
  }

  // Modal Submit (Step 2 -> Step 3 Success)
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate inputs in Step 2
      if (!textareaPitch.value || !inputWhatsapp.value) {
        textareaPitch.reportValidity() || inputWhatsapp.reportValidity();
        return;
      }

      // Show temporary loading indicator on submit button
      const submitBtn = document.getElementById('step2-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Reserving your spot...';
      submitBtn.disabled = true;

      // Compile form data for the WhatsApp message
      const name = inputName.value;
      const category = selectCategory.value;
      const brand = inputBrand.value || 'None (Individual)';
      const pitch = textareaPitch.value;
      const whatsapp = inputWhatsapp.value;
      const instagram = document.getElementById('input-instagram').value || 'None';

      const messageText = `Hi huzla! 🚀 I want to join The First Wave at KASU.

Here are my supplier details:
• Name: ${name}
• Category: ${category}
• Brand/Hustle: ${brand}
• What I do: ${pitch}
• WhatsApp: ${whatsapp}
• Instagram: ${instagram}`;

      // Open WhatsApp link in a new tab (2348092267124)
      const targetPhone = '2348092267124';
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;

      // Delay transition to simulate verification and allow WhatsApp tab to trigger cleanly
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Open WhatsApp redirect
        window.open(whatsappUrl, '_blank');

        // Transition modal to Success screen
        step2.classList.remove('active');
        step3.classList.add('active');
        progressBarFill.style.width = '100%';
      }, 1000);
    });
  }


  /* --- 3. DYNAMIC INTERACTIVE SOLUTIONS MOCKUP --- */
  const categoryPills = document.querySelectorAll('.category-pill');
  
  // Data for each category inside the mockup
  const mockProfiles = {
    'Food': {
      name: 'The Cake Plug',
      handle: '@cake_plug • KASU Campus Vendor',
      avatar: 'assets/images/food_vendor.png',
      services: [
        { name: 'Birthday Cakes (Custom order)', price: '₦15,000+' },
        { name: 'Red Velvet Slices (Instant delivery)', price: '₦2,500' },
        { name: 'Cupcake Pack (Box of 6)', price: '₦6,000' }
      ],
      gallery: ['assets/images/food_vendor.png', 'assets/images/fashion_seller.png']
    },
    'Fashion': {
      name: 'The Thrift Plug',
      handle: '@thrift_by_amina • KASU Campus Vendor',
      avatar: 'assets/images/fashion_seller.png',
      services: [
        { name: 'Vintage Denim Jackets', price: '₦8,500' },
        { name: 'Chunky Custom Sneakers', price: '₦18,000' },
        { name: 'Graphic Tees (Oversized)', price: '₦4,500' }
      ],
      gallery: ['assets/images/fashion_seller.png', 'assets/images/photographer.png']
    },
    'Photography': {
      name: 'Femi Alao Photos',
      handle: '@femi_photos • KASU Freelancer',
      avatar: 'assets/images/photographer.png',
      services: [
        { name: 'Matriculation Outdoor Shoot', price: '₦12,000' },
        { name: 'Hostel Birthday Candid Session', price: '₦8,000' },
        { name: 'Creative Brand Portraits', price: '₦20,000' }
      ],
      gallery: ['assets/images/photographer.png', 'assets/images/developer.png']
    },
    'Tech': {
      name: 'Tunde Codes',
      handle: '@tunde_codes • KASU Tech Guy',
      avatar: 'assets/images/developer.png',
      services: [
        { name: 'Portfolio Web Development', price: '₦35,000+' },
        { name: 'Database Integration & APIs', price: '₦25,000' },
        { name: 'React App Debugging (hourly)', price: '₦5,000/hr' }
      ],
      gallery: ['assets/images/developer.png', 'assets/images/food_vendor.png']
    }
  };

  const updateMockup = (category) => {
    const data = mockProfiles[category];
    if (!data) return;

    // Elements in the mockup card
    const nameEl = document.querySelector('.vendor-meta-info h3');
    const handleEl = document.querySelector('.vendor-handle');
    const avatarEl = document.querySelector('.vendor-avatar');
    const servicesContainer = document.querySelector('.vendor-services');
    const galleryItems = document.querySelectorAll('.gallery-item-placeholder');
    const searchUrl = document.querySelector('.app-search-bar');

    // Smooth transition: fade out slightly before swapping
    const cardBody = document.querySelector('.app-card-body');
    cardBody.style.opacity = '0.3';
    cardBody.style.transform = 'translateY(5px)';
    cardBody.style.transition = 'all 0.2s ease-in-out';

    setTimeout(() => {
      // Update values
      searchUrl.textContent = `huzla.app/kasu/${category.toLowerCase().replace(' ', '-')}`;
      nameEl.textContent = data.name;
      handleEl.innerHTML = `${data.handle}`;
      avatarEl.style.backgroundImage = `url('${data.avatar}')`;

      // Update services
      let servicesHtml = '<h4>SERVICES &amp; OFFERS</h4>';
      data.services.forEach(s => {
        servicesHtml += `
          <div class="service-row">
            <span class="service-name">${s.name}</span>
            <span class="service-price">${s.price}</span>
          </div>
        `;
      });
      servicesContainer.innerHTML = servicesHtml;

      // Update gallery placeholders
      if (galleryItems.length >= 2 && data.gallery.length >= 2) {
        galleryItems[0].style.backgroundImage = `url('${data.gallery[0]}')`;
        galleryItems[1].style.backgroundImage = `url('${data.gallery[1]}')`;
      }

      // Fade back in
      cardBody.style.opacity = '1';
      cardBody.style.transform = 'translateY(0)';
    }, 200);
  };

  // Add click events to pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const selectedCat = e.target.textContent;
      
      // Supported categories in our demo data
      if (mockProfiles[selectedCat]) {
        categoryPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        updateMockup(selectedCat);
        
        // Pause auto-rotation when user interacts
        clearInterval(autoRotationInterval);
      }
    });
  });

  // Auto rotate categories every 4 seconds
  const rotatableCategories = ['Food', 'Fashion', 'Photography', 'Tech'];
  let currentRotationIndex = 0;
  
  const rotateCategories = () => {
    currentRotationIndex = (currentRotationIndex + 1) % rotatableCategories.length;
    const currentCat = rotatableCategories[currentRotationIndex];
    
    categoryPills.forEach(pill => {
      if (pill.textContent === currentCat) {
        pill.classList.add('active');
        updateMockup(currentCat);
      } else {
        // Only remove active from other rotatable ones
        if (rotatableCategories.includes(pill.textContent)) {
          pill.classList.remove('active');
        }
      }
    });
  };

  let autoRotationInterval = setInterval(rotateCategories, 4000);


  /* --- 4. BUTTERY-SMOOTH ACCORDION (FAQ) --- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items first for exclusive accordion behavior
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        // Set dynamic height based on content size
        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answerEl.style.maxHeight = '0';
      }
    });
  });


  /* --- 5. INTERSECTION OBSERVER FOR WHATSAPP STATUS SIMULATOR --- */
  const chatSimulation = document.getElementById('chat-simulation');
  const chatBubbles = document.querySelectorAll('.status-bubble');
  const transitionHeadline = document.getElementById('problem-solution-transition');

  if (chatSimulation && chatBubbles.length > 0) {
    // Initial states set via JS to handle non-JS environments gracefully
    chatBubbles.forEach(bubble => {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(25px)';
      bubble.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    if (transitionHeadline) {
      transitionHeadline.style.opacity = '0';
      transitionHeadline.style.transform = 'scale(0.95)';
      transitionHeadline.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    const startChatSimulation = () => {
      chatBubbles.forEach((bubble, index) => {
        setTimeout(() => {
          bubble.style.opacity = '1';
          bubble.style.transform = 'translateY(0)';
        }, index * 1000); // 1-second delay sequence between WhatsApp queries
      });

      // Show the glowing orange transition headline after all cards are loaded
      if (transitionHeadline) {
        setTimeout(() => {
          transitionHeadline.style.opacity = '1';
          transitionHeadline.style.transform = 'scale(1)';
          // Add a subtle bounce glow effect
          transitionHeadline.style.textShadow = '0 0 20px var(--brand-orange-dim)';
        }, chatBubbles.length * 1000 + 400);
      }
    };

    const chatObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startChatSimulation();
          observer.unobserve(entry.target); // Run only once
        }
      });
    }, { threshold: 0.3 });

    chatObserver.observe(chatSimulation);
  }


  /* --- 6. SCROLL ENTRANCE ANIMATIONS (GENERAL ELEMENTS) --- */
  // Create animated entry classes for sections and benefit cards
  const animatableElements = document.querySelectorAll('.story-card, .benefit-card, .social-card');
  
  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatableElements.forEach(el => scrollObserver.observe(el));
});
