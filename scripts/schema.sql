-- PostgreSQL database dump

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

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

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.messages (
    id integer NOT NULL DEFAULT nextval('public.messages_id_seq'),
    text text NOT NULL,
    "user" character varying(255) NOT NULL,
    added timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create sequence if not exists
CREATE SEQUENCE IF NOT EXISTS public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.top_messages (
    id integer NOT NULL DEFAULT nextval('public.top_messages_id_seq'),
    sender_name character varying(100) NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create sequence if not exists
CREATE SEQUENCE IF NOT EXISTS public.top_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Set sequence ownership
ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
ALTER SEQUENCE public.top_messages_id_seq OWNED BY public.top_messages.id;

-- Drop existing constraints if they exist (optional)
-- You might need to adjust these commands based on your specific setup
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'messages_pkey') THEN
        ALTER TABLE public.messages DROP CONSTRAINT messages_pkey;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'top_messages_pkey') THEN
        ALTER TABLE public.top_messages DROP CONSTRAINT top_messages_pkey;
    END IF;
END $$;

-- Add primary key constraints
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.top_messages
    ADD CONSTRAINT top_messages_pkey PRIMARY KEY (id);
