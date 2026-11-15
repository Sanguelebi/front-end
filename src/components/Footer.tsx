import { Icon } from '@iconify/react';

function Footer() {
    return (
        <footer className="bg-primary">
            <div className="font-medium mx-20 p-12">
                <div className=" flex justify-between">
                    <h3 className="text-background text-2xl">Course Selection Platform</h3>

                    <div className="flex text-background capitalize gap-8">
                        <ul className=" space-y-6 w-47">
                            <li>topic</li>
                            <li>page</li>
                            <li>page</li>
                            <li>page</li>
                        </ul>

                        <ul className="space-y-6 w-47">
                            <li>topic</li>
                            <li>page</li>
                            <li>page</li>
                            <li>page</li>
                        </ul>

                        <ul className="space-y-6 w-47">
                            <li>topic</li>
                            <li>page</li>
                            <li>page</li>
                            <li>page</li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-4">
                    <a
                        href="https://www.facebook.com/sanguofficial/?locale=ka_GE"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                    >
                        <Icon
                            icon="ri:facebook-fill"
                            className="text-background size-5 hover:opacity-80 transition-opacity"
                        />
                    </a>

                    <a
                        href="https://www.linkedin.com/school/sangu/?originalSubdomain=ge"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Icon
                            icon="ri:linkedin-fill"
                            className="text-background size-5 hover:opacity-80 transition-opacity"
                        />
                    </a>

                    <a
                        href="https://www.youtube.com/@sanguofficial/videos"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="YouTube"
                    >
                        <Icon
                            icon="ri:youtube-fill"
                            className="text-background size-5 hover:opacity-80 transition-opacity"
                        />
                    </a>

                    <a
                        href="https://www.instagram.com/sangu_uni/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <Icon
                            icon="ri:instagram-line"
                            className="text-background size-5 hover:opacity-80 transition-opacity"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
