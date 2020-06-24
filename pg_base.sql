--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-06-24 11:45:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 258 (class 1259 OID 148016)
-- Name: bases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bases (
    base_pk integer NOT NULL,
    description character varying(200) NOT NULL
);


ALTER TABLE public.bases OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 148014)
-- Name: bases_base_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bases_base_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bases_base_pk_seq OWNER TO postgres;

--
-- TOC entry 2930 (class 0 OID 0)
-- Dependencies: 257
-- Name: bases_base_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bases_base_pk_seq OWNED BY public.bases.base_pk;


--
-- TOC entry 2796 (class 2604 OID 148019)
-- Name: bases base_pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases ALTER COLUMN base_pk SET DEFAULT nextval('public.bases_base_pk_seq'::regclass);


--
-- TOC entry 2798 (class 2606 OID 148021)
-- Name: bases bases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_pkey PRIMARY KEY (base_pk);


-- Completed on 2020-06-24 11:45:43

--
-- PostgreSQL database dump complete
--

