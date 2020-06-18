--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-06-18 13:19:37

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
-- TOC entry 205 (class 1259 OID 148082)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL,
    user_id_1c character varying(36) NOT NULL,
    code character varying(10) NOT NULL,
    organization_pk character varying(36) NOT NULL,
    head_employee_pk character varying(36) NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 164461)
-- Name: employee_workplace_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_workplace_history (
    position_pk character varying(36) NOT NULL,
    subdivision_pk character varying(36) NOT NULL,
    employee_pk character varying(36) NOT NULL,
    date_from timestamp without time zone NOT NULL,
    base_pk integer NOT NULL
);


ALTER TABLE public.employee_workplace_history OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 148087)
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    name character varying(200) NOT NULL,
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 148099)
-- Name: position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."position" (
    name character varying(150),
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL
);


ALTER TABLE public."position" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 148094)
-- Name: subdivision; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subdivision (
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL,
    parent_pk character varying(36),
    organization_pk character varying(36),
    name character varying(150),
    code character varying(9)
);


ALTER TABLE public.subdivision OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 156252)
-- Name: types_of_time; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types_of_time (
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL,
    name character varying(50) NOT NULL,
    time_code character varying(3) NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    general_time_pk character varying(36) NOT NULL,
    predefined_name character varying(50) NOT NULL
);


ALTER TABLE public.types_of_time OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 156250)
-- Name: types_of_time_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.types_of_time_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.types_of_time_pk_seq OWNER TO postgres;

--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 209
-- Name: types_of_time_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.types_of_time_pk_seq OWNED BY public.types_of_time.pk;


--
-- TOC entry 204 (class 1259 OID 148073)
-- Name: user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_groups (
    group_pk integer NOT NULL,
    user_pk integer NOT NULL
);


ALTER TABLE public.user_groups OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 148064)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    firstname character varying(50),
    lastname character varying(50),
    patronymic character varying(50),
    id_1c character varying(36),
    email character varying(100) NOT NULL,
    pk integer NOT NULL,
    base_pk integer DEFAULT 0 NOT NULL,
    password character varying(100) NOT NULL,
    status integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 148062)
-- Name: users_pk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_pk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_pk_seq OWNER TO postgres;

--
-- TOC entry 2883 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_pk_seq OWNED BY public.users.pk;


--
-- TOC entry 211 (class 1259 OID 164450)
-- Name: work_schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_schedules (
    pk character varying(36) NOT NULL,
    base_pk integer NOT NULL,
    name character varying(100),
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.work_schedules OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 164456)
-- Name: work_schedules_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_schedules_data (
    base_pk integer NOT NULL,
    work_schedule_pk character varying(36) NOT NULL,
    work_date date NOT NULL,
    types_of_time_pk character varying(36) NOT NULL,
    work_hour real
);


ALTER TABLE public.work_schedules_data OWNER TO postgres;

--
-- TOC entry 2725 (class 2604 OID 148067)
-- Name: users pk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN pk SET DEFAULT nextval('public.users_pk_seq'::regclass);


--
-- TOC entry 2744 (class 2606 OID 156261)
-- Name: types_of_time TypesOfTime_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types_of_time
    ADD CONSTRAINT "TypesOfTime_pkey" PRIMARY KEY (pk, base_pk);


--
-- TOC entry 2742 (class 2606 OID 148103)
-- Name: position employee_position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."position"
    ADD CONSTRAINT employee_position_pkey PRIMARY KEY (pk, base_pk);


--
-- TOC entry 2750 (class 2606 OID 164465)
-- Name: employee_workplace_history employee_workplace_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_workplace_history
    ADD CONSTRAINT employee_workplace_history_pkey PRIMARY KEY (base_pk, employee_pk, date_from);


--
-- TOC entry 2738 (class 2606 OID 148093)
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (base_pk, pk);


--
-- TOC entry 2736 (class 2606 OID 148086)
-- Name: employee pk_base_pk__pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT pk_base_pk__pk PRIMARY KEY (base_pk, pk);


--
-- TOC entry 2740 (class 2606 OID 148098)
-- Name: subdivision subdivision_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subdivision
    ADD CONSTRAINT subdivision_pkey PRIMARY KEY (pk, base_pk);


--
-- TOC entry 2734 (class 2606 OID 148081)
-- Name: user_groups user_groups_Index01; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "user_groups_Index01" PRIMARY KEY (group_pk, user_pk) WITH (fillfactor='100');


--
-- TOC entry 2732 (class 2606 OID 148070)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (pk);


--
-- TOC entry 2748 (class 2606 OID 164460)
-- Name: work_schedules_data work-schedules-data_pKey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_schedules_data
    ADD CONSTRAINT "work-schedules-data_pKey" PRIMARY KEY (base_pk, work_schedule_pk, work_date, types_of_time_pk);


--
-- TOC entry 2746 (class 2606 OID 164455)
-- Name: work_schedules work_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_schedules
    ADD CONSTRAINT work_schedules_pkey PRIMARY KEY (base_pk, pk);


--
-- TOC entry 2729 (class 1259 OID 148071)
-- Name: users_email_uniq; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_uniq ON public.users USING btree (email);


--
-- TOC entry 2730 (class 1259 OID 148072)
-- Name: users_id_1c_uniq; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_1c_uniq ON public.users USING btree (id_1c);


-- Completed on 2020-06-18 13:19:38

--
-- PostgreSQL database dump complete
--

