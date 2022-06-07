ALTER DATABASE IsleOfMist OWNER TO postgres;

CREATE TABLE public.arena (
    arn_id integer NOT NULL,
    arn_rawcode character varying(64000) NOT NULL
);


ALTER TABLE public.arena OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 95849)
-- Name: arenas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.arena ALTER COLUMN arn_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.arenas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 95855)
-- Name: character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."character" (
    chr_id integer NOT NULL,
    chr_firstname character varying(255) NOT NULL,
    chr_lastname character varying(255),
    chr_basehp integer NOT NULL,
    chr_baseatk integer NOT NULL,
    chr_baseacc integer NOT NULL,
    chr_basedef integer NOT NULL,
    chr_file character varying(255),
    chr_description character varying(64000),
    chr_icon character varying(16),
    chr_tile character varying
);


ALTER TABLE public."character" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 95866)
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."character" ALTER COLUMN chr_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.characters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 95872)
-- Name: characterskill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characterskill (
    cs_chr_id integer NOT NULL,
    cs_skl_id integer NOT NULL
);


ALTER TABLE public.characterskill OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 95880)
-- Name: matchcharacter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matchcharacter (
    mch_id integer NOT NULL,
    mch_positionx integer NOT NULL,
    mch_positiony integer NOT NULL,
    mch_ap integer NOT NULL,
    mch_hp integer NOT NULL,
    mch_hasegg boolean NOT NULL,
    mch_hasboon boolean NOT NULL,
    mch_chr_id integer NOT NULL,
    mch_isrecovering boolean NOT NULL,
    mch_ply_id integer NOT NULL,
    mch_isguarding boolean
);


ALTER TABLE public.matchcharacter OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 95888)
-- Name: gamecharacters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.matchcharacter ALTER COLUMN mch_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.gamecharacters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 95889)
-- Name: guardian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guardian (
    grd_id integer NOT NULL,
    grd_positionx integer NOT NULL,
    grd_positiony integer NOT NULL,
    grd_hp integer NOT NULL,
    grd_isegg boolean NOT NULL
);


ALTER TABLE public.guardian OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 95892)
-- Name: guardians_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.guardian ALTER COLUMN grd_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.guardians_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 95893)
-- Name: match; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match (
    m_id integer NOT NULL,
    m_playeroneid integer NOT NULL,
    m_playertwoid integer,
    m_round integer NOT NULL,
    m_winnerid integer,
    m_arn_id integer,
    m_grd_id integer,
    m_name character varying(16),
    m_password character varying(256),
    m_activeplayer integer
);


ALTER TABLE public.match OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 95896)
-- Name: match_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.match ALTER COLUMN m_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 95897)
-- Name: matchcharacterskill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matchcharacterskill (
    mcs_mch_id integer NOT NULL,
    mcs_skl_id integer NOT NULL,
    mcs_canuse boolean NOT NULL
);


ALTER TABLE public.matchcharacterskill OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 95900)
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player (
    ply_id integer NOT NULL,
    ply_name character varying(36) NOT NULL,
    ply_password character varying(1000) NOT NULL
);


ALTER TABLE public.player OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 95905)
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.player ALTER COLUMN ply_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 95906)
-- Name: skill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skill (
    skl_id integer NOT NULL,
    skl_name character varying(255) NOT NULL,
    skl_description character varying(512) NOT NULL,
    skl_range integer,
    skl_area integer,
    skl_cost integer NOT NULL,
    skl_truedamage integer,
    skl_diceamount integer,
    skl_dicetype integer,
    skl_target integer
);


ALTER TABLE public.skill OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 95911)
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.skill ALTER COLUMN skl_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4356 (class 0 OID 95839)
-- Dependencies: 209
-- Data for Name: arena; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.arena OVERRIDING SYSTEM VALUE VALUES (1, 'GWGLGGGGGLGWGGWGLG
EEEGGLGGGGLWGLLGWG
GGFGGGGGWGGGGGGLWG
GGGWGGWGGGWGFGGGGG
LGGGGGLGGGGGGLGGWL
GGLGLLGGGGWGGGGGGG
GGGGGGGGWGLGGGGGGL
WGLGLGGGGGGGGGGFGL
GGGGFGGGGGGGGGGGGG
LGWGGGGGGGGGGGGLGG
GGWGLGGGGGGGGGWGGG
GGGGGGGGGGGGGGGGGG
GGFGWLGGGGGGGGGGWW
LGGGGWGGGGGGGGFGGW
GGGGWGWLWGLGGGLGLG
GGGGFGGGGGWGWGGGGG
GWGGGFGGGLGGGLGGGG
GGWGGGGGWGGGGGLEEE');


--
-- TOC entry 4358 (class 0 OID 95855)
-- Dependencies: 211
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (1, 'Seii', 'ccubus', 30, 6, 4, 11, 'Princess of the Underworld', NULL, 'snake', 'L');
INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (2, 'Alessia', ' Beauclair', 30, 4, 6, 11, 'Heiress of the Goddess', NULL, 'feather-alt', 'W');
INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (3, 'Scarlet', ' Emeria', 35, 5, 4, 12, 'the Outrider', NULL, 'fire', 'F');
INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (4, 'Shinsuke', ' Yato', 35, 4, 5, 12, 'Brod''Thur', NULL, 'bow-arrow', 'W');
INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (5, 'Zodan', NULL, 40, 4, 4, 13, 'Avatar of the Sun', NULL, 'sun', 'L');
INSERT INTO public."character" OVERRIDING SYSTEM VALUE VALUES (6, 'Gobbo', NULL, 40, 5, 3, 13, 'the Macer', NULL, 'mace', 'F');


--
-- TOC entry 4360 (class 0 OID 95872)
-- Dependencies: 213
-- Data for Name: characterskill; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.characterskill VALUES (1, 1);
INSERT INTO public.characterskill VALUES (1, 2);
INSERT INTO public.characterskill VALUES (2, 3);
INSERT INTO public.characterskill VALUES (2, 4);
INSERT INTO public.characterskill VALUES (3, 5);
INSERT INTO public.characterskill VALUES (3, 6);
INSERT INTO public.characterskill VALUES (4, 7);
INSERT INTO public.characterskill VALUES (4, 8);
INSERT INTO public.characterskill VALUES (5, 9);
INSERT INTO public.characterskill VALUES (5, 10);
INSERT INTO public.characterskill VALUES (6, 11);
INSERT INTO public.characterskill VALUES (6, 12);
INSERT INTO public.characterskill VALUES (1, 13);
INSERT INTO public.characterskill VALUES (1, 14);
INSERT INTO public.characterskill VALUES (2, 13);
INSERT INTO public.characterskill VALUES (2, 14);
INSERT INTO public.characterskill VALUES (3, 13);
INSERT INTO public.characterskill VALUES (3, 14);
INSERT INTO public.characterskill VALUES (4, 13);
INSERT INTO public.characterskill VALUES (4, 14);
INSERT INTO public.characterskill VALUES (5, 13);
INSERT INTO public.characterskill VALUES (5, 14);
INSERT INTO public.characterskill VALUES (6, 13);
INSERT INTO public.characterskill VALUES (6, 14);


--
-- TOC entry 4363 (class 0 OID 95889)
-- Dependencies: 216
-- Data for Name: guardian; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.guardian OVERRIDING SYSTEM VALUE VALUES (1, 10, 9, 8, false);


--
-- TOC entry 4365 (class 0 OID 95893)
-- Dependencies: 218
-- Data for Name: match; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4361 (class 0 OID 95880)
-- Dependencies: 214
-- Data for Name: matchcharacter; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4367 (class 0 OID 95897)
-- Dependencies: 220
-- Data for Name: matchcharacterskill; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4368 (class 0 OID 95900)
-- Dependencies: 221
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.player OVERRIDING SYSTEM VALUE VALUES (23, 'User1', '$2b$10$Z09hDN4pLP7U505i9W9f/OWh14Y07pQYntADH2JuM.4Jirdn5MrOC');
INSERT INTO public.player OVERRIDING SYSTEM VALUE VALUES (24, 'User2', '$2b$10$2LzJtoTGxdPohlFhoK5dA.gRu3.U45KtTLxAyE2e1ZcXkc.xmcSK.');
INSERT INTO public.player OVERRIDING SYSTEM VALUE VALUES (25, 'User3', '$2b$10$3wab5/KJn9cHM9aDGL5oNethx.e/QMocZAhXpaoHuEaUFdqbbeRK2');
INSERT INTO public.player OVERRIDING SYSTEM VALUE VALUES (26, 'User4', '$2b$10$/s8fLgaUT2XfJFNVtvHAFudFW/BtDtIWsVbJLlxUa8/dUQVNCUqTO');


--
-- TOC entry 4370 (class 0 OID 95906)
-- Dependencies: 223
-- Data for Name: skill; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (1, 'Love and Hate', 'Grants every allied unit additional damage during their next turn.', 3, NULL, 2, NULL, 2, 4, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (3, 'Rain of Arrows', 'Deal damage on all tiles chosen.', 4, 3, 3, NULL, 2, 4, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (7, 'Swift Draw', 'Perform a Strike on any enemy that moves. Execute.', 4, NULL, 3, 4, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (5, 'Flame Trace', 'Perform a Strike, then move 4 spaces.', 1, 5, 2, 5, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (9, 'Flip', 'Target moves to the opposite side of unit.', 1, NULL, 0, NULL, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (13, 'Attack', 'Strike an adjacent foe.', 1, NULL, 1, NULL, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (11, 'Protect', 'If target takes damage, unit takes damage instead.', 2, 1, 2, NULL, 1, 2, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (14, 'Guard', 'Receive -3 damage during your opponent''s next turn.', 1, NULL, 1, NULL, 1, NULL, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (4, 'Alessia Skill', 'Perform a Strike.', 4, 1, 6, 4, 2, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (6, 'Scarlet Skill', 'Pull ally toward this unit.\nPerform an Attack on enemy, then pull it toward this unit.\nIf the target is the Guardian, the unit pulls themselves toward it and deals extra damage.', 5, 1, 4, 5, 2, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (8, 'Shinsuke Skill', 'Deal damage on all tiles chosen. Execute.', 2, 7, 6, 4, 2, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (10, 'Zodan Skill', 'Perform an Attack, then push target 2 spaces. +2 Defence.', 1, 2, 2, NULL, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (12, 'Gobbo Skill', 'Move in any direction, stopping if unit collides with an enemy. ', 5, 5, 4, 4, 1, 8, NULL);
INSERT INTO public.skill OVERRIDING SYSTEM VALUE VALUES (2, 'Seii Skill', 'If the targeted ally performs any ability with the “Strike” keyword, it may attack twice.', 8, 1, 3, NULL, 1, 2, NULL);


--
-- TOC entry 4381 (class 0 OID 0)
-- Dependencies: 210
-- Name: arenas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arenas_id_seq', 1, true);


--
-- TOC entry 4382 (class 0 OID 0)
-- Dependencies: 212
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.characters_id_seq', 6, true);


--
-- TOC entry 4383 (class 0 OID 0)
-- Dependencies: 215
-- Name: gamecharacters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gamecharacters_id_seq', 37, true);


--
-- TOC entry 4384 (class 0 OID 0)
-- Dependencies: 217
-- Name: guardians_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guardians_id_seq', 1, true);


--
-- TOC entry 4385 (class 0 OID 0)
-- Dependencies: 219
-- Name: match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_id_seq', 32, true);


--
-- TOC entry 4386 (class 0 OID 0)
-- Dependencies: 222
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.players_id_seq', 26, true);


--
-- TOC entry 4387 (class 0 OID 0)
-- Dependencies: 224
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_id_seq', 14, true);


--
-- TOC entry 4190 (class 2606 OID 95927)
-- Name: arena arenas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arena
    ADD CONSTRAINT arenas_pkey PRIMARY KEY (arn_id);


--
-- TOC entry 4192 (class 2606 OID 95933)
-- Name: character characters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."character"
    ADD CONSTRAINT characters_pkey PRIMARY KEY (chr_id);


--
-- TOC entry 4194 (class 2606 OID 95939)
-- Name: characterskill characterskills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characterskill
    ADD CONSTRAINT characterskills_pkey PRIMARY KEY (cs_chr_id, cs_skl_id);


--
-- TOC entry 4196 (class 2606 OID 95945)
-- Name: matchcharacter gamecharacters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matchcharacter
    ADD CONSTRAINT gamecharacters_pkey PRIMARY KEY (mch_id);


--
-- TOC entry 4198 (class 2606 OID 95950)
-- Name: guardian guardians_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guardian
    ADD CONSTRAINT guardians_pkey PRIMARY KEY (grd_id);


--
-- TOC entry 4200 (class 2606 OID 95955)
-- Name: match match_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_pkey PRIMARY KEY (m_id);


--
-- TOC entry 4202 (class 2606 OID 95960)
-- Name: matchcharacterskill matchcharacterskill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matchcharacterskill
    ADD CONSTRAINT matchcharacterskill_pkey PRIMARY KEY (mcs_mch_id, mcs_skl_id);


--
-- TOC entry 4204 (class 2606 OID 95965)
-- Name: player players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT players_pkey PRIMARY KEY (ply_id);


--
-- TOC entry 4206 (class 2606 OID 95969)
-- Name: skill skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skl_id);


--
-- TOC entry 4207 (class 2606 OID 95972)
-- Name: characterskill characterskills_charid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characterskill
    ADD CONSTRAINT characterskills_charid_fkey FOREIGN KEY (cs_chr_id) REFERENCES public."character"(chr_id);


--
-- TOC entry 4208 (class 2606 OID 95979)
-- Name: characterskill characterskills_skillid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characterskill
    ADD CONSTRAINT characterskills_skillid_fkey FOREIGN KEY (cs_skl_id) REFERENCES public.skill(skl_id);


--
-- TOC entry 4209 (class 2606 OID 95986)
-- Name: matchcharacter gamecharacters_baseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matchcharacter
    ADD CONSTRAINT gamecharacters_baseid_fkey FOREIGN KEY (mch_chr_id) REFERENCES public."character"(chr_id);


--
-- TOC entry 4211 (class 2606 OID 95993)
-- Name: match match_activeplayer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_activeplayer_fkey FOREIGN KEY (m_activeplayer) REFERENCES public.player(ply_id) NOT VALID;


--
-- TOC entry 4212 (class 2606 OID 96005)
-- Name: match match_arenaid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_arenaid_fkey FOREIGN KEY (m_arn_id) REFERENCES public.arena(arn_id) NOT VALID;


--
-- TOC entry 4213 (class 2606 OID 96016)
-- Name: match match_guardianid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_guardianid_fkey FOREIGN KEY (m_grd_id) REFERENCES public.guardian(grd_id) NOT VALID;


--
-- TOC entry 4214 (class 2606 OID 96026)
-- Name: match match_playeroneid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_playeroneid_fkey FOREIGN KEY (m_playeroneid) REFERENCES public.player(ply_id);


--
-- TOC entry 4215 (class 2606 OID 96036)
-- Name: match match_playertwoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_playertwoid_fkey FOREIGN KEY (m_playertwoid) REFERENCES public.player(ply_id);


--
-- TOC entry 4216 (class 2606 OID 96047)
-- Name: match match_winnerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT match_winnerid_fkey FOREIGN KEY (m_winnerid) REFERENCES public.player(ply_id);


--
-- TOC entry 4210 (class 2606 OID 96057)
-- Name: matchcharacter matchcharacters_playerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matchcharacter
    ADD CONSTRAINT matchcharacters_playerid_fkey FOREIGN KEY (mch_ply_id) REFERENCES public.player(ply_id) NOT VALID;


--
-- TOC entry 4378 (class 0 OID 0)
-- Dependencies: 4377
-- Name: DATABASE IsleOfMist; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE IsleOfMist FROM PUBLIC;


--
-- TOC entry 4379 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 4380 (class 0 OID 0)
-- Dependencies: 864
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO postgres;


-- Completed on 2022-05-30 21:43:11

--
-- PostgreSQL database dump complete
--
