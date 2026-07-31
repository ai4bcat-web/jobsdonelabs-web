# GoHighLevel Setup — Freight Brokerage Guide CTA

## What this CTA does
LinkedIn post → landing page (`/free-guide/freight-brokerage-automation/`) → form fill → auto-sends guide PDF + opts into newsletter

## What you need to do in GoHighLevel

### Option A: Quick Start (use existing LeadConnector chat widget)
The chat widget is already embedded on the landing page (same as every page on jobsdonelabs.ai). When someone messages you or fills out the chat form, create a workflow:

1. Go to Automations → Workflows → Create Workflow
2. Trigger: "Chat Widget — New Conversation" or "Form Submitted"
3. Filter: page URL contains `freight-brokerage-automation`
4. Action 1: Send email with the guide PDF (create the email template with the guide attached or linked)
5. Action 2: Add contact to "Newsletter" list/campaign
6. Action 3: Add tag "freight-guide-download"

### Option B: Better Experience (dedicated form)
The landing page has a placeholder `<div id="leadconnector-form">` where you can embed a GHL form:

1. Go to Sites → Forms → Create Form
2. Fields: First name, Email, Hidden field: `source` = `freight-brokerage-guide`
3. Style: match the dark theme on the page (background: #171513, accent: #D34E24)
4. Copy the embed code (JavaScript snippet)
5. Paste it into the landing page HTML, replacing the `<!-- LeadConnector form will embed here -->` comment
6. Set up the same automation workflow as Option A

### Option C: Webhook (if you want to bypass GHL forms entirely)
The fallback form on the page already POSTs to a webhook URL:
```
POST https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_TOKEN/trigger/guide-download
```
1. In GHL, go to Settings → Webhooks → Create Webhook
2. Point it to your email delivery automation
3. Replace `RYNE_WEBHOOK_TOKEN` in the HTML with your actual token
4. Un-hide the fallback form (change `style="display:none"` to `style="display:flex"`)

## The Guide PDF
The guide content is on the landing page itself. If you want a PDF version:
- Create it from the landing page content (print to PDF)
- Host it at `/free-guide/freight-brokerage-automation/guide.pdf` (just add the file to the same directory)
- Link to it in the GHL email template

## Newsletter
The email copy on the page commits to:
- "One email a week on logistics automation, ops strategy, and what's actually working in freight right now"
- Make sure the GHL automation adds them to the correct newsletter list
- The page says "Unsubscribe anytime, and I'll still send the guide" — make sure your unsubscribe workflow doesn't revoke guide access

## Test before launch
1. Fill out the form yourself
2. Verify the guide email arrives
3. Verify you're added to the newsletter list
4. Verify unsubscribe works

## Landing page URL
```
https://www.jobsdonelabs.ai/free-guide/freight-brokerage-automation/
```

## LinkedIn post location
```
~/AI_WORKSPACE/jobsdonelabs/content/linkedin/cta-top-3-freight-automations.md
```