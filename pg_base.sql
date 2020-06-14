CREATE TABLE public.users (
  firstname   varchar(50),
  lastname    varchar(50),
  patronymic  varchar(50),
  id_1c       varchar(36),
  email       varchar(100) NOT NULL,
  pk          serial NOT NULL,
  base_pk     integer NOT NULL DEFAULT 0,
  "password"  varchar(100) NOT NULL,
  status      integer,
  /* Keys */
  CONSTRAINT users_pkey
    PRIMARY KEY (pk)
);

CREATE UNIQUE INDEX users_email_uniq
  ON public.users
  (email);

CREATE UNIQUE INDEX users_id_1c_uniq
  ON public.users
  (id_1c);

CREATE TABLE public.user_groups (
  group_pk  integer NOT NULL,
  user_pk   integer NOT NULL,
  /* Keys */
  CONSTRAINT "user_groups_Index01"
    PRIMARY KEY (group_pk, user_pk)
);

CREATE TABLE public.employee (
  pk                varchar(36) NOT NULL,
  base_pk           integer NOT NULL,
  user_id_1c        varchar(36) NOT NULL,
  code              varchar(10) NOT NULL,
  organization_pk   varchar(36) NOT NULL,
  head_employee_pk  varchar(36) NOT NULL,
  /* Keys */
  CONSTRAINT pk_base_pk__pk
    PRIMARY KEY (base_pk, pk)
);

CREATE TABLE public.organization (
  "name"   varchar(200) NOT NULL,
  pk       varchar(36) NOT NULL,
  base_pk  integer NOT NULL,
  code     varchar(10),
  /* Keys */
  CONSTRAINT organization_pkey
    PRIMARY KEY (base_pk, pk)
);


CREATE TABLE public.subdivision (
  pk               varchar(36) NOT NULL,
  base_pk          integer NOT NULL,
  parent_pk        varchar(36),
  organization_pk  varchar(36),
  "name"           varchar(150),
  code             varchar(9),
  /* Keys */
  CONSTRAINT subdivision_pkey
    PRIMARY KEY (pk, base_pk)
);


CREATE TABLE public."position" (
  "name"   varchar(150),
  pk       varchar(36) NOT NULL,
  base_pk  integer NOT NULL,
  /* Keys */
  CONSTRAINT employee_position_pkey
    PRIMARY KEY (pk, base_pk)
);


CREATE TABLE public.types_of_time (
  pk               varchar(36) NOT NULL,
  base_pk          integer NOT NULL,
  "name"           varchar(50) NOT NULL,
  code             varchar(3) NOT NULL,
  deleted          boolean NOT NULL DEFAULT false,
  general_time_pk  varchar(36) NOT NULL,
  predefined_name  varchar(50) NOT NULL,
  /* Keys */
  CONSTRAINT "TypesOfTime_pkey"
    PRIMARY KEY (pk, base_pk)
);
