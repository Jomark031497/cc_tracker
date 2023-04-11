import { RiVisaLine, RiMastercardLine } from 'react-icons/ri';
import { SiJcb, SiAmericanexpress } from 'react-icons/si';

export function paymentNetworkIcons(
  network: 'VISA' | 'MASTERCARD' | 'JCB' | 'AMERICAN_EXPRESS' | 'DINERS_CLUB',
) {
  const networkIcons = {
    VISA: RiVisaLine,
    MASTERCARD: RiMastercardLine,
    JCB: SiJcb,
    AMERICAN_EXPRESS: SiAmericanexpress,
    DINERS_CLUB: SiAmericanexpress,
  };

  return networkIcons[network];
}
