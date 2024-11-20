import React from 'react';

const TopBanner = () => {
	return (
		<div className="leaderboards_top-banner">
			<div className="leaderboards_header-bg_wrap">
				<div className="vid-embed w-embed">
					<video autoPlay loop muted playsInline width="100%" height="100%">
						<source src="https://files.tig.foundation/banner.mp4" type="video/mp4" />
					</video>
					<style>
						{`
							video {
								object-fit: cover !important;
								background-size: cover !important;
								background-repeat: no-repeat !important;
							}
						`}
					</style>
				</div>
			</div>
			<div className="connect-wallet_banner-wrap">
				<div className="page-name_wrap">
					<div className="text-h3 is-white is-bold">Innovator</div>
				</div>
				<div className="wallet-connect-wrap is-white">
					<div className="wallet-states">
						<div id="wallet-connected" className="wallet-info-wrap_connected" style={{ opacity: 1, display: 'flex' }}>
							<a id="wallet-address-btn" href="https://basescan.org/address/0x538e92a5eb57ffe9e669908c12a04e5761f0be79" target="_blank" className="wallet-address-wrap address w-inline-block" rel="noreferrer">
								<div id="wallet-address" className="text-para is-wallet-address">0x538e9...0be79</div>
							</a>
							<a id="wallet-disconnect-btn" href="#" className="connect-wallet-button is-disconnect w-inline-block">
								<div className="wallet-text">Disconnect</div>
							</a>
							<div id="wallet-disconnect-btn-mobile" className="wallet-disconnect-button_mobile">
								<div className="cross-icon w-embed">
									<svg xmlns="http://www.w3.org/2000/svg" height="auto" width="auto" fill="#fff" viewBox="0 0 378.5 378.5">
										<path d="M368 317.1c14.1 14.1 14.1 36.8 0 50.9s-37 14.1-51 0L189.3 240.2 61.6 368c-14.1 14-36.9 14-51 0-14.1-14.1-14.1-36.8 0-50.9l127.7-127.8L10.6 61.5c-14.1-14.1-14.1-36.8 0-50.9s37-14.1 51.1 0l127.6 127.8L316.9 10.6c14.1-14.1 36.9-14.1 51 0s14.1 36.8 0 50.9L240.3 189.3 368 317.1h0z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBanner;