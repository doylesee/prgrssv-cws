<p><a href="https://careers.progressive.com/"><img src="https://doylesee.github.io/prgrssv-cws/thumbnail.jpg" /></a></p>

## Project Overview
<pre>
<b>Project:</b>   Progressive Insurance Careers
<b>Role:</b>      Lead UI Developer & Technical Project Liaison
<b>Tools:</b>     Liquid, HTML5, CSS3, JavaScript / jQuery, Foundation, Google Lighthouse
</pre>
&nbsp;<strong><a href="https://careers.progressive.com/">View project</a></strong>

<br />

## The Challenge
This initiative was a massive "lift-and-shift" migration project, moving Progressive's complete enterprise recruitment portal from a third-party vendor over to our platform.

The project introduced severe logistical and technical bottlenecks:

**Massive Content Scale**<br />
The migration encompassed hundreds of high-traffic pages across widely distinct pages (Category pages, Team page, and Blogs). Every single page required complete layout accuracy, precise asset mapping, and meticulous manual migration of embedded SEO metadata, with the project to be completed on a very tight timeline.

**SEO Retention & Redirects**<br />
To preserve years of established search indexing, a massive map of URL redirects had to be tracked and configured perfectly to prevent broken links.

**CMS Structural Limitations**<br />
Progressive's recruitment team needed the capability to update and manage these varied contents post-launch. However, our destination platform only provided a single WYSIWYG text editor field, making the management of custom and complex layouts like multi-column structural cards, interactive FAQs, and media carousels inherently impossible for non-technical users.

<br />

## Core Objectives
**Enterprise-Scale Content Migration**<br />
Seamlessly transition hundreds of content-heavy, distinct pages into a unified platform architecture without data loss.

**SEO & URL Mapping Continuity**<br />
Maintain historical search engine rankings by mapping and configuring proper URL redirect structures across every single legacy page.

**No-Code Layout Parsing Engine**<br />
Program a backend abstraction layer to transform raw WYSIWYG text inputs into beautiful, accessible components dynamically.

**Cross-Functional Project Management**<br />
Spearhead the operational roadmap, manage requirements-gathering, and coordinate client-side User Acceptance Testing (UAT).

**Performance & Accessibility Auditing**<br />
Achieve high-tier web optimization and adherence to rigid corporate WCAG web accessibility standards.

**Empowering Client Handoff**<br />
Create comprehensive, step-by-step user documentation to guarantee a seamless post-launch transition and empower non-technical administrators to manage the site independently.

<br />

## My Approach & Implementation
### 1. Operational Leadership & Strategy (Stepping into Project Management)
Recognizing early structural and communication gaps in the internal project management timeline, I actively stepped beyond my development boundaries to steer the project’s delivery. I communicated directly with the corporate stakeholder team at Progressive to untangle and lock down exact technical requirements.

To bring order to the massive data volume, I established an organized operational workflow:

**Master Mapping Index**<br />
Created an exhaustive master index sheet tracking every page, its target layout type, custom functionality notes, and explicit SEO redirect paths.

**Asset Packaging Pipeline**<br />
Designed a highly structured per-page folder hierarchy that centralized copy, images, and distinct page configuration metadata in one accessible location.

**UAT Management**<br />
Took full accountability for directing and monitoring the User Acceptance Testing phase, rapidly resolving edge-case bugs raised by the client.

### 2. Developing the WYSIWYG Code Compiler
To empower the non-technical recruitment team to manage page contents independently, I utilized Liquid Markup to intercept raw user content. I created an internal parsing matrix that checked for simple user-typed text markers wrapped in basic HTML tags (such as SECTION 3-COLUMN TILES START or SECTION FAQ START).

My backend parser systematically processed these strings, stripped erratic code formatting, checked for design modifier styles (like background-1 through background-3), and cleanly injected corresponding design fragments (like layout-team-tiles or layout-video-player) dynamically. If an author published a blog post, the engine went a step further by dynamically identifying the opening text block, pulling the first word, and formatting a stylish, stylized drop-cap letter purely via code logic.

### 3. Client Enablement & Training Documentation
To bridge the gap between my custom technical architecture and the non-technical recruitment team, I wrote a comprehensive Content Management Documentation Guide. This documentation served as a definitive future reference tool, detailing exactly how to use the special formatting text markers to trigger advanced layouts. 

By outlining clear visual formatting rules, detailing component variations, and providing intuitive copy-pasteable layout variables, I removed the guesswork from their workflow and guaranteed an incredibly smooth operational transition during the platform handoff.

### 4. Automated Performance Optimization & Auditing
With hundreds of pages densely packed with heavy corporate media assets, web optimization was critical. I built asset performance rules into the core layout loop that targeted text and image sections. The code dynamically audited elements and appended native loading="lazy" tags to images, forcing the browser to defer downloading below-the-fold graphics until scrolled into view.

I rigorously monitored performance metrics using Google Lighthouse. My semantic, modular frontend code achieved exceptional raw performance scores between 85 and 95, ensuring a highly performant and stable foundation despite heavy tracking scripts and external CMS application layers.

<br />

## Results & Impact
**Flawless Enterprise Delivery**<br />
Successfully migrated and launched hundreds of content-heavy web pages completely on-schedule, keeping Progressive's massive recruitment ecosystem intact.

**Preserved Traffic Optimization**<br />
Successfully secured historical organic traffic rankings through precision mapping, with zero downtime or broken paths recorded during the vendor transition.

**Autonomous Non-Technical Management & Seamless Handoff**<br />
Transformed a highly restrictive single-field CMS editor into an intuitive component builder. Supported by my comprehensive documentation, the Progressive recruitment team gained full creative autonomy to update and scale web pages completely independently, requiring zero post-launch engineering oversight.

**Exceptional Technical Engineering Metrics**<br />
Achieved pristine, responsive page-load speeds with Google Lighthouse scores landing as high as 95, proving that highly dynamic, accessible content code can perform seamlessly at scale.

<br /><strong><a href="https://careers.progressive.com/">View project</a></strong>
