// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

export interface MenuContextState {
  openMenu: () => any;
  closeMenu: () => any;
  setMenuPosition: (ref: any) => void;
  checkMenuPosition: (ref: any) => void;
  open: number;
  show: number;
  position: [number, number];
}

export const MenuContext: React.Context<MenuContextState> = React.createContext(
  {
    openMenu: () => {},
    closeMenu: () => {},
    setMenuPosition: (ref: any) => {},
    checkMenuPosition: (ref: any) => {},
    open: 0,
    show: 0,
    position: [0, 0],
  }
);

export const useMenu = () => React.useContext(MenuContext);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(0);
  const [show, setShow] = useState(0);

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const openMenu = () => {
    if (open) return;
    setOpen(1);
  };

  const closeMenu = () => {
    setOpen(0);
    setShow(0);
  };

  const setMenuPosition = (posRef: any) => {
    if (open) return;
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = posRef.current.getBoundingClientRect();

    const x = elemRect.left - bodyRect.left;
    const y = elemRect.top - bodyRect.top;

    setPosition([x, y]);
    openMenu();
  };

  const checkMenuPosition = (menuRef: any) => {
    const bodyRect = document.body.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    let x = menuRect.left - bodyRect.left;
    let y = menuRect.top - bodyRect.top;
    const right = menuRect.right;
    const bottom = menuRect.bottom;

    // small offset from menu start
    y -= 10;

    if (right > bodyRect.right) {
      x = bodyRect.right - menuRef.current.offsetWidth - 10;
    }
    if (bottom > bodyRect.bottom) {
      y = bodyRect.bottom - menuRef.current.offsetHeight - 10;
    }

    setPosition([x, y]);
    setShow(1);
  };

  return (
    <MenuContext.Provider
      value={{
        openMenu,
        closeMenu,
        setMenuPosition,
        checkMenuPosition,
        open,
        show,
        position,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
