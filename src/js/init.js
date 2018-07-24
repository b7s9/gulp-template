// init.js

{
	let SoundsArr = []; //refactor as class var ?
	const featureContainerEl = document.querySelector('section.result .feature');
	const galleryContainerEl = document.querySelector('section.result .gallery');
	
	const introSection = document.querySelector('section.intro');
	const dataInputSection = document.querySelector('section.data-input');
	const resultSection = document.querySelector('section.result');

	/**
	 * 
	 */
	class Sound {
		constructor(title, sign, imgsrc, desc, feature = false){
			this.titleStr = title;
			this.titleCompact = this.titleStr.toLowerCase().replace(/\s/g,'');

			this.signStr = sign;
			this.imgSrcPath = imgsrc;
			this.descStr = desc;
			this.isFeature = feature;

			this.svgSrc = document.querySelector(`.svgLoader .${this.titleCompact}`).getAttribute('data');

			SoundsArr.push(this);
		}

		setFeature(bool){
			this.isFeature = bool;
		}

		/**
		 * Creates HTML Card Elements
		 *   Determines if card is feature or gallery and appends accordingly
		 *   Generates HTML content from obj props
		 *   Adds Click event listener to play audio on btn click
		 * @return {void}
		 */
		createSoundEl(){			
			let containerEl = document.createElement('div');
			containerEl.classList.add('card');

			let titleEl = document.createElement('h2');
			titleEl.classList.add('sound-title');
			titleEl.classList.add( this.titleCompact );

			let titleText = document.createTextNode(this.titleStr);

			let waveSvg = document.createElement('object');
			waveSvg.classList.add( this.titleCompact );
			waveSvg.setAttribute('type', 'image/svg+xml');
			// waveSvg.setAttribute('data', this.imgSrcPath);
			waveSvg.setAttribute('data', this.svgSrc );
			waveSvg.setAttribute('tabindex', '-1');

			let playBtn = document.createElement('button');
			playBtn.setAttribute('type', 'button');
			playBtn.classList.add('player')
			let playBtnText = document.createTextNode('Play Sound');
			playBtn.appendChild(playBtnText);	

			let descText = document.createTextNode(this.descStr);	
			let descEl = document.createElement('p');
			descEl.appendChild(descText);

			playBtn.addEventListener('click', (e) => {
				playSound(this.titleStr)
			});

			titleEl.appendChild(titleText);			
			containerEl.appendChild(titleEl);
			containerEl.appendChild(waveSvg);
			containerEl.appendChild(playBtn);
			containerEl.appendChild(descEl);

			if(this.isFeature){
				featureContainerEl.appendChild(containerEl);
			}else{
				galleryContainerEl.appendChild(containerEl);
			}
		}
	}

	/**
	 * Plays specified audio
	 * @param  {String} str Passed from Sound.titleEl
	 *   matches audio el ID in audio preloader, then plays
	 * @return {bool} bool On success: true, on error: false
	 */
	const playSound = (str) => { //where str = name
		str = str.toLowerCase();
		str = str.replace(/\s/g,'');
		const el = document.querySelector(`audio.${str}`);
		el.onerror = () => {
			return false;
		}
		el.play();
		return true;
	}

	/**
	 * Generates new Sound objects and HTML Sound cards
	 *   Sets the current featured Sound
	 * @param  {String} AstroSign The astrological sign to set feature
	 * @return {void}
	 */
	const initSoundEls = (AstroSign) => {

		//set cardsLoaded Promise

		console.log(AstroSign)

		const bitcrush = new Sound('Bitcrush', 'Cap', 'img', 'The bitcrushed 808 is distorted by lowering the bit depth (amplitude/vertical) and/or resolution (sample rate/horizontal). Bitcrushed 808\'s can be used to sound harsh, introduce codensed harmonics, or have a video-game qualilty.');
		const eroded = new Sound('Eroded', 'Sag', 'img', 'The wide-noise erosion 808 is distorted by modulating a frequency band by filtered noise, creating noisey artefacting in the filter range. Eroded 808\'s can be used to slightly fill out mid-band frequencies and introduce a more gritty sound.');
		const fuzzy = new Sound('Fuzzy', 'Sco', 'img', 'This particular fuzzy 808 is built on filtered noise and a saw wave. Fuzzy 808\'s are rare, but can be used for full spectrum high impact scenarios.');
		const glide = new Sound('Glide', 'Lib', 'img', 'The gliding 808 is created by increasing the portamento time to an audible amount, before and between notes. Gliding 808\'s are a staple of trap and future bass music, owing an increased intrigue to higher perceived movement between down beats.');
		const overdrive = new Sound('Overdrive', 'Vir', 'img', 'The overdriven 808 is distorted by clipping the output amplitude far beyond unity. Overdriven 808\'s can be used to sound fuzzy, while maintaining low frequency content, or blasted through an amp.');
		const pure = new Sound('Pure', 'Leo', 'img', 'The pure 808 is simply a sine wave. Pure 808\'s can be used in club settings or hi-fi audio systems where the sub woofers are sufficient to transmit low-frequency content at an impactful amplitude.');
		const saturated = new Sound('Saturated', 'Can', 'img', 'The saturated 808 is distorted by clipping the output of the source signal using a selected modulation algorithm. Saturated 808\'s can be used to delicately introduce upper harmonics and increase perceived volume.');
		const square = new Sound('Square', 'Gem', 'img', 'The square 808 is simply a square wave. Square 808\'s offer hollow frequency modulations across the full spectrum. Square 808\'s can be used as a precise form of upper harmonic distortion or have a video-game quality.');
		const thirdHarm = new Sound('Third Harmonic', 'Tau', 'img', 'The 808 using the third harmonic, is created by adding the third harmonic of the fundamental frequency to the source signal. This produces a perfect fifth, one octave above the root note. The third harmonic is commonly found in a variety of distortions and can be found in almost every 808, included either intentionally or not.');
		const triangle = new Sound('Triangle', 'Ari', 'img', 'The triangle 808 is simply a triangle wave. Triangle 808\'s offer a middle ground between high content of pure sine waves and full square waves, at the cost of less impactful sub frequencies. Triangle 808\'s can be used to emulate an 80\'s synthesizer bass or help fill out the mid content of a bass.');
		const tube = new Sound('Tube', 'Pis', 'img', 'The tube 808 is specifically distorted using an old fashioned amp (or software emulation). Tube 808\'s can be used to acheive a retro, lo-fi or hollow sound.');
		const wide = new Sound('Wide', 'Aqu', 'img', 'This specific wide 808 is created by modulating the source signal through a 4 voice chorus modulation with varying spatial wideness, delay times, and phase. The wide 808 can be used fill out stereo space in a mix.');

		let featureTitle = '';

		for(const instance of SoundsArr){
			if(instance.signStr === AstroSign){
				instance.setFeature(true);
				featureTitle = instance.titleStr;
			}
			instance.createSoundEl();				
		}

		// playSound(featureTitle);
	}


	//---------------------------------------

	const editFormLink = document.querySelector('.edit-form > a');
	editFormLink.addEventListener('click', (e) => {
		transitionScene([resultSection,introSection], dataInputSection);
	})

	/**
	 * Hides and shows specified HTML sections
	 *   Called upon user entering a new area
	 * @param  {HTML Element, Array} hide 
	 * @param  {HTML Element, Array, null} show 
	 * @return {void}
	 */
	const transitionScene = (hide, show) => {
		//utilize css transitions to smooth
		// hide.setAttribute('style', 'display:none');
		// show.setAttribute('style', 'display:inline-block');
		if(hide.constructor === Array){
			for( const section of hide ){
				section.hidden = true;
			}
		}else{
			hide.hidden = true
		}	

		if(show.constructor === Array){
			for( const section of hide ){
				section.hidden = false;
			}
		}else if(typeof show !== undefined){
			show.hidden = false
		}
	}

	const startButtonEl = document.querySelector('section.intro button.start');
	startButtonEl.addEventListener('click', (e) => {
		e.preventDefault();
		transitionScene( document.querySelector('section.intro'), document.querySelector('section.data-input') );
	}, false);

	//---------------------------------------
	const daysInMonthArr = [31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];
	//days are indexed at 1. months at 0

	const formFieldsArr = document.forms['user-data'].elements;
	const nameFieldInp = formFieldsArr.name;
	const monthFieldInp = formFieldsArr.month;
	const dayFieldInp = formFieldsArr.day;
	const formButtonInp = document.querySelector('section.data-input button.next');

	/**
	 * Uses user selected month to generate day options
	 *   Days calculated from hard coded list
	 * @return {void}
	 */
	const populateDaysInput = () => {
		
		dayFieldInp.innerHTML= '';

		for(let i=0; i<daysInMonthArr[ monthFieldInp.value ]; i++){
			
			const dayOption = document.createElement('option', {value: i+1} );
			dayOption.innerHTML = i+1;
			dayFieldInp.appendChild(dayOption);
		}

	}

	/**
	 * Requires hame field to have nonzero len. and have no numbers
	 * @param  {HTML form text input} field 
	 * @return {bool} if Valid: true; else: false
	 */
	const validateNameFieldInp = (field) => { //field is a text form input
		//return true if valid || return false
		const feedback = field.parentElement.children[0];

		feedback.innerHTML = '';
		feedback.hidden = true;

		const err = (msg, feedback) => { 			
			const errMsg = document.createElement('p');
			errMsg.appendChild( document.createTextNode(msg) );

			feedback.appendChild(errMsg);
			feedback.hidden = false;

			return false;
		}

		if( field.value.length < 1 ){
			err('Please enter your name', feedback);
			return false;
		}

		if( field.value.search(/[0-9]/g) > -1 ){
			err('No numeric characters allowed', feedback);
			return false;
		}
		
		return true;

	}

	/**
	 * Triggers all form submission events
	 *   Clears results page prior to Sound card regeneration
	 *   Resets Sound cards prior to Sound card regeneration
	 *   Transitions out of intro section into results
	 *   Initializes Sound card generation
	 * @param  {HTML form collection} form It's always the same form but eh.
	 * @return {void}
	 */
	const handleFormSubmit = (form) => {
		let AstroSign = getAstroSign(form[1].value, form[2].value);

		// for( const div of resultSection.children){
		// 	div.innerHTML = '';
		// }

		galleryContainerEl.innerHTML = '';
		featureContainerEl.innerHTML = '';
		SoundsArr = [];

		transitionScene( document.querySelector('section.data-input'), document.querySelector('section.result') );

		initSoundEls(AstroSign);

	}

	monthFieldInp.addEventListener('change', (e) => {
		populateDaysInput();
	});

	nameFieldInp.addEventListener('blur', (e) => {
		validateNameFieldInp(e.target);
	})

	formButtonInp.addEventListener('click', (e) => {
		e.preventDefault();
		//month and day are technically always valid
		//new promise. once done, play audio		
		if( validateNameFieldInp(nameFieldInp) ){
			handleFormSubmit(e.target.form)
		}
		//validateNameFieldInp(nameFieldInp) && handleFormSubmit(e.target.form);

	}, false);

	/**
	 * Provided algorithm to determine astrological sign
	 * @param  {int} month 1 indexed
	 * @param  {int} day 1 indexed
	 * @return {String} Astrosign a 3 char string
	 */
	const getAstroSign = (month, day) => { 
		++month;
		let AstroSign = '';

		//month and day are 1 indexed
		if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
		  AstroSign = "Cap";
		} else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
		  AstroSign = "Sag";
		} else if ((month == 10 && day >= 24) || (month == 11 && day <= 21)) {
		  AstroSign = "Sco";
		} else if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) {
		  AstroSign = "Lib";
		} else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
		  AstroSign = "Vir";
		} else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
		  AstroSign = "Leo";
		} else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
		  AstroSign = "Can";
		} else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
		  AstroSign = "Gem";
		} else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
		  AstroSign = "Tau";
		} else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
		  AstroSign = "Ari";
		} else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
		  AstroSign = "Pis";
		} else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
		  AstroSign = "Aqu";
		}

		return AstroSign;
	}

	//------------------------------------------------
}
