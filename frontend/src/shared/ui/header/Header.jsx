import Logo from '../../assets/logo_2x.png';
import {Button, Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Authorization} from "../../../pages/authorization/Authorization";


function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <header className="header">
        <div className="header__wrapper">
          <div className="header__left">
            <img
              className="header__logo"
              src={Logo}
              alt="Yandex tracker logo"
              width="151"
              height="40"
            />
          </div>

          <div className="header__account">
            <Button onClick={open}>Аккаунты</Button>
          </div>
      </div>
      <>
        <Modal
            opened={opened}
            onClose={close}
            radius={0}
            size="lg"
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
          <Authorization/>
        </Modal>


      </>
    </header>
  );
}

export default Header;
